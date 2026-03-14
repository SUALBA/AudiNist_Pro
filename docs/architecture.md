# AuditNIST Architecture Overview

AuditNIST is structured as a modular audit engine with clear separation of responsibilities.

## Layers

### 1. UI Layer
- auditnist-local.html
- Handles user interaction
- Does not contain audit logic

### 2. Core Layer
Located in /core

- AuditEngine.js → orchestrates framework + controls
- RiskEngine.js → calculates compliance and risk summary
- EvaluationManager.js (planned) → session evaluation logic

### 3. Framework Layer
Located in /frameworks

Each framework implements its own adapter:
- NistAdapter
- IsoAdapter
- CisAdapter
- CobitAdapter

Adapters provide:
- Categories
- Control placeholders
- Domain-based control lists

### 4. AI Layer
Local model (Ollama + Qwen2.5:3b)
Used ONLY for:
- Evidence drafting
Not used for normative structure.