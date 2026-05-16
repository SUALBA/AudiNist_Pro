"""
AuditNIST Pro — PDF Processor
-------------------------------
Extracts text from PDF files using PyMuPDF (fitz), then splits it into
overlapping chunks suitable for embedding.

Chunk strategy:
  - Target size : 500 characters
  - Overlap     : 50 characters
  - Split boundary: prefer sentence endings ('. ', '! ', '? ', '\n')
    so chunks don't break mid-sentence where avoidable.
"""

import re
import fitz  # PyMuPDF


CHUNK_SIZE    = 500   # target characters per chunk
CHUNK_OVERLAP = 100   # characters of overlap between consecutive chunks (20%)


def extract_text_from_pdf(file_bytes: bytes, source_name: str) -> list[dict]:
    """
    Open a PDF from raw bytes and return a list of chunk dicts:
      {text: str, page: int, source: str}
    """
    doc   = fitz.open(stream=file_bytes, filetype="pdf")
    pages = []

    for page_num in range(len(doc)):
        page = doc[page_num]
        # 'text' layout preserves columns/paragraphs better than default
        text = page.get_text("text").strip()
        if text:
            pages.append({"text": text, "page": page_num + 1})

    doc.close()

    # Merge all page text into a single string, keeping page markers
    full_text = "\n".join(
        f"[Page {p['page']}]\n{p['text']}" for p in pages
    )

    return _split_into_chunks(full_text, source_name)


def _find_split_boundary(text: str, target: int) -> int:
    """
    Find the best split position at or before `target` characters.
    Prefers sentence-ending punctuation over raw character boundary.
    """
    window = text[max(0, target - 80): target + 1]
    # Search backwards for a sentence boundary
    for sep in (". ", "! ", "? ", "\n\n", "\n"):
        idx = window.rfind(sep)
        if idx != -1:
            return max(0, target - 80) + idx + len(sep)
    return target


def _split_into_chunks(text: str, source_name: str) -> list[dict]:
    """
    Split `text` into overlapping chunks and return list of chunk dicts.
    Each dict: {text, source, page}
    """
    chunks = []
    start  = 0
    length = len(text)

    while start < length:
        end = min(start + CHUNK_SIZE, length)

        # Try to split on a sentence boundary if not at end
        if end < length:
            end = _find_split_boundary(text, end)

        chunk_text = text[start:end].strip()
        if chunk_text:
            # Extract page number from "[Page N]" marker if present
            page_match = re.search(r'\[Page (\d+)\]', chunk_text)
            page_num   = int(page_match.group(1)) if page_match else 1

            chunks.append({
                "text"  : chunk_text,
                "source": source_name,
                "page"  : page_num
            })

        # Move forward with overlap
        start = end - CHUNK_OVERLAP
        if start >= end:
            break  # safety guard against infinite loop

    return chunks
