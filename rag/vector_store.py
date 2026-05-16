"""
AuditNIST Pro — Vector Store
------------------------------
In-memory FAISS-based vector store.  One VectorStore instance per
audit session (keyed by session_id in the server layer).

Uses IndexFlatIP (inner product).  Because embedder.py produces
L2-normalised vectors, inner product == cosine similarity — so
higher scores mean more relevant chunks.
"""

import numpy as np
import faiss


EMBEDDING_DIM = 384


class VectorStore:
    """Per-session FAISS index + chunk metadata store."""

    def __init__(self):
        self.index  = faiss.IndexFlatIP(EMBEDDING_DIM)
        self.chunks : list[dict] = []   # [{text, source, page}, ...]

    # ------------------------------------------------------------------
    def add(self, chunks: list[dict], embeddings: np.ndarray) -> None:
        """
        Add pre-computed embeddings and their corresponding chunk dicts.

        Args:
            chunks     : list of {text, source, page}
            embeddings : np.ndarray shape (len(chunks), EMBEDDING_DIM), float32
        """
        if len(chunks) == 0:
            return
        self.index.add(embeddings)
        self.chunks.extend(chunks)

    # ------------------------------------------------------------------
    def query(self, query_embedding: np.ndarray,
              top_k: int = 5) -> list[dict]:
        """
        Retrieve the top-k most similar chunks.

        Args:
            query_embedding : np.ndarray shape (1, EMBEDDING_DIM) or (EMBEDDING_DIM,)
            top_k           : number of results to return

        Returns:
            list of {text, source, page, score} sorted descending by score
        """
        if self.index.ntotal == 0:
            return []

        vec = query_embedding.reshape(1, -1).astype(np.float32)
        k   = min(top_k, self.index.ntotal)

        scores, indices = self.index.search(vec, k)

        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx < 0:
                continue   # FAISS returns -1 for empty slots
            chunk = dict(self.chunks[idx])   # copy so caller can't mutate
            chunk["score"] = float(score)
            results.append(chunk)

        return results

    # ------------------------------------------------------------------
    @property
    def chunk_count(self) -> int:
        return self.index.ntotal


# ---------------------------------------------------------------------------
# Session registry — maps session_id (str) → VectorStore
# ---------------------------------------------------------------------------
_stores: dict[str, VectorStore] = {}


def get_store(session_id: str) -> VectorStore:
    if session_id not in _stores:
        _stores[session_id] = VectorStore()
    return _stores[session_id]


def delete_store(session_id: str) -> None:
    _stores.pop(session_id, None)


def list_sessions() -> list[str]:
    return list(_stores.keys())
