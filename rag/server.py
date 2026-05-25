"""
AuditNIST Pro — RAG Server
----------------------------
FastAPI server on port 8765 providing three endpoints:

  POST   /upload              — ingest PDF files into a session vector store
  POST   /query               — semantic search over a session's chunks
  DELETE /session/{session_id} — free a session's memory

Run with:
    python rag/server.py
or:
    uvicorn rag.server:app --port 8765

CORS is open (localhost only in practice — this server is never exposed
to the internet; it runs on the auditor's own machine).
"""

import uuid
import logging
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Local modules (same package)
from pdf_processor import extract_text_from_pdf
from embedder     import embed
from vector_store import get_store, delete_store


# ---------------------------------------------------------------------------
logging.basicConfig(
    level   = logging.INFO,
    format  = "%(asctime)s  %(levelname)-8s %(message)s",
    datefmt = "%H:%M:%S"
)
log = logging.getLogger("rag-server")


# ---------------------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("AuditNIST RAG server starting…")
    # Pre-load the embedding model so the first /upload isn't slow
    embed(["warm-up"])
    log.info("Embedding model ready.  Listening on http://localhost:8765")
    yield
    log.info("RAG server shutting down.")


app = FastAPI(title="AuditNIST RAG Server", version="1.0.0",
              lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["*"],
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"],
)


# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------
class QueryRequest(BaseModel):
    session_id  : str
    control_name: str = ""
    question    : str = ""
    top_k       : int = 5


class QueryResponse(BaseModel):
    chunks: list[dict]


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/health")
def health():
    """Simple liveness check — browser polls this to detect the server."""
    return {"status": "ok", "service": "AuditNIST RAG"}


@app.post("/upload")
async def upload(
    files      : list[UploadFile] = File(...),
    session_id : str              = Form(default="")
):
    """
    Accept one or more PDF files, extract + embed their text, and store
    the chunks in the session's VectorStore.

    Returns the session_id (generated if not provided), number of docs
    processed, and total chunk count.
    """
    if not session_id:
        session_id = str(uuid.uuid4())

    store       = get_store(session_id)
    doc_count   = 0
    chunk_count = 0

    for upload_file in files:
        if not upload_file.filename:
            continue

        raw   = await upload_file.read()
        fname = upload_file.filename

        log.info(f"Processing '{fname}' ({len(raw):,} bytes) …")
        try:
            chunks = extract_text_from_pdf(raw, fname)
        except Exception as exc:
            log.warning(f"  Failed to parse '{fname}': {exc}")
            continue

        if not chunks:
            log.warning(f"  No text extracted from '{fname}'.")
            continue

        texts      = [c["text"] for c in chunks]
        embeddings = embed(texts)
        store.add(chunks, embeddings)

        doc_count   += 1
        chunk_count += len(chunks)
        log.info(f"  '{fname}' → {len(chunks)} chunks indexed.")

    return {
        "session_id" : session_id,
        "doc_count"  : doc_count,
        "chunk_count": chunk_count
    }


@app.post("/query", response_model=QueryResponse)
def query(req: QueryRequest):
    """
    Semantic search over a session's indexed chunks.

    The query text is `control_name + ' ' + question`, embedded and
    compared to all stored chunks.  Returns the top_k most relevant.
    """
    store = get_store(req.session_id)

    if store.chunk_count == 0:
        return QueryResponse(chunks=[])

    query_text = f"{req.control_name} {req.question}".strip()
    if not query_text:
        return QueryResponse(chunks=[])

    q_vec   = embed([query_text])          # shape (1, 384)
    results = store.query(q_vec, req.top_k)

    return QueryResponse(chunks=results)


@app.delete("/session/{session_id}")
def delete_session(session_id: str):
    """Free memory for the given session."""
    delete_store(session_id)
    log.info(f"Session '{session_id}' deleted.")
    return {"deleted": session_id}


# ---------------------------------------------------------------------------
if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host    = "127.0.0.1",
        port    = 8765,
        reload  = False,
        workers = 1
    )
