📄 AuditEngine Core v1 Specification
# AuditEngine Core v1 Specification

Author: Susana Alba  
Project: AuditNIST Pro  
Version: 1.0  
Date: 2026

---

# 1. Vision

AuditEngine is a lightweight, framework-agnostic cybersecurity audit engine designed to transform complex security frameworks into practical assessment tools.

Traditional frameworks such as NIST CSF, ISO 27001 or CIS Controls provide strong conceptual guidance but are often difficult to apply during real audits.

AuditEngine aims to bridge that gap by converting framework structures into structured evaluation units that auditors can review quickly and consistently.

The engine separates:

• framework definitions  
• audit logic  
• risk evaluation  
• reporting

This separation allows the system to support multiple frameworks while keeping the audit process simple.

---

# 2. Project Goals

The core objectives of AuditEngine are:

1. Convert security frameworks into structured audit models
2. Provide a lightweight audit workflow
3. Support multiple frameworks through adapters
4. Keep the system modular and extensible
5. Allow optional AI assistance without dependency

The engine is designed to be:

• simple to understand  
• extensible  
• framework-agnostic  

---

# 3. System Architecture

The architecture separates the main concerns of the system.


Architecture:

User Interface
      │
      ▼
AuditEngine Core
      │
      ├── Evaluation Manager
      ├── Risk Engine
      └── Reporting Engine
      │
      ▼
Framework Adapters
      │
      ├── NIST CSF
      ├── ISO 27001
      └── CIS Controls
# 4. Repository Structure

The project follows a modular structure designed for extensibility.

AuditNIST_PRO/

core/
   auditEngine.js
   riskEngine.js
   evaluationManager.js

models/
   control.js
   auditSession.js
   evaluation.js

frameworks/
   nistAdapter.js
   iso27001Adapter.js

ai/
   aiProvider.js
   ollamaProvider.js

reporting/
   reportEngine.js

ui/
   auditnist-local.html

docs/
   AuditEngine-Core-v1-Spec.md

README.md

Each directory has a specific responsibility.

# 5. Core Components

**AuditEngine**
The AuditEngine coordinates the audit process.

Responsibilities:

• initialize audit sessions
• load frameworks
• coordinate evaluations
• trigger risk calculations
• generate reports

Example conceptual implementation:

class AuditEngine {

 constructor(adapter) {
   this.framework = adapter.loadFramework()
 }

 startAudit(metadata) {
   this.session = new AuditSession(metadata)
 }

 evaluateControl(controlId, evaluationData) {
   EvaluationManager.record(controlId, evaluationData)
 }

 generateReport() {
   return ReportEngine.generate(this.session)
 }

}

**EvaluationManager**

Manages the evaluation of controls.

Responsibilities:

• record audit results
• store evidence and notes
• maintain evaluation consistency

**RiskEngine**
Calculates the risk level associated with control evaluations.

Example simplified logic:

if status == "Not Implemented" → High Risk
if status == "Partial" → Medium Risk
if status == "Implemented" → Low Risk

Future versions may include more advanced risk scoring.

# 6. Data Model

The engine relies on a structured data model.

**Control**
Represents a framework control.

{
  "id": "PR.AC-1",
  "title": "Identity Management",
  "description": "Identities are managed and controlled",
  "framework": "NIST-CSF",
  "category": "Protect"
}

**Evaluation**
Represents the auditor's assessment.

{
  "control_id": "PR.AC-1",
  "status": "Partial",
  "notes": "Identity management exists but lacks automation",
  "evidence": "Active Directory policy",
  "risk_score": "Medium"
}

**AuditSession**
Represents a complete audit process.

{
  "company": "Example Organization",
  "framework": "NIST-CSF",
  "auditor": "Susana Alba",
  "date": "2026",
  "evaluations": []
}
# 7. Framework Adapter System

Framework adapters allow the engine to support multiple cybersecurity standards.

Adapters convert framework structures into control objects usable by the engine.

Examples:

nistAdapter.js
iso27001Adapter.js
cisAdapter.js

This design ensures the engine itself remains framework-agnostic.

# 8. Reporting Engine

The reporting engine generates summaries of the audit results.

Possible outputs include:

• audit summary
• risk overview
• compliance percentage
• recommendations

Future versions may support:

• PDF export
• dashboard visualization
• compliance reports

# 9. AI Integration Layer

AI assistance is optional and modular.

The AI layer can provide:

• explanations of controls
• remediation suggestions
• risk interpretation

The engine remains functional even without AI providers.

Supported providers may include:

• local LLM (Ollama)
• cloud LLM providers

# 10. Execution Flow

• The audit workflow follows this process:

• User starts an audit

• Framework adapter loads controls

• AuditEngine creates an audit session

• Auditor evaluates controls

• EvaluationManager stores results

• RiskEngine calculates risk

• ReportingEngine generates report

# 11. Design Principles

AuditEngine follows several design principles:

• Framework-agnostic architecture
• Separation of UI and audit logic
• Modular extensibility
• Lightweight implementation
• Optional AI integration

# 12. Future Extensions

Possible future capabilities include:

• additional framework adapters
• advanced risk scoring
• automated evidence collection
• integration with SIEM tools
• API for external systems

# 13. Product Roadmap
**Version 0.1**

Initial prototype

Features:

• NIST CSF adapter
• manual control evaluation
• basic risk scoring
• simple report generation



**Version 0.2**

Extended framework support

Features:

• ISO 27001 adapter
• CIS Controls adapter
• improved reporting

**Version 0.3**

Enhanced intelligence

Features:

• AI-assisted recommendations
• audit dashboards
• exportable reports

# 14. Conclusion

AuditEngine provides a flexible foundation for transforming cybersecurity frameworks into practical audit tools.

By separating the audit engine from framework definitions and user interfaces, the system remains adaptable and extensible.

This architecture allows AuditNIST Pro to evolve into a lightweight but powerful cybersecurity audit platform.


---



