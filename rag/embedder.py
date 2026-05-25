"""
AuditNIST Pro — Embedder
--------------------------
Wraps sentence-transformers/all-MiniLM-L6-v2 for generating 384-dim
embeddings that are L2-normalised so inner-product == cosine similarity.

The model (~90 MB) is loaded once at module import time and cached in
`_MODEL`. Subsequent calls reuse the same instance — no re-loading.
"""

import numpy as np
from sentence_transformers import SentenceTransformer

_MODEL: SentenceTransformer | None = None
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"


def _get_model() -> SentenceTransformer:
    global _MODEL
    if _MODEL is None:
        print(f"[embedder] Loading model {MODEL_NAME} …")
        _MODEL = SentenceTransformer(MODEL_NAME)
        print("[embedder] Model ready.")
    return _MODEL


def embed(texts: list[str]) -> np.ndarray:
    """
    Embed a list of strings.

    Returns:
        np.ndarray of shape (len(texts), 384), dtype float32,
        each row L2-normalised (so inner product == cosine similarity).
    """
    if not texts:
        return np.empty((0, 384), dtype=np.float32)

    model  = _get_model()
    vecs   = model.encode(texts, convert_to_numpy=True,
                          normalize_embeddings=True,
                          show_progress_bar=False)
    return vecs.astype(np.float32)
