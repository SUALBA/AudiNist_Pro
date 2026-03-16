🔐 AuditNIST Pro
Lightweight Cybersecurity Audit Toolkit designed to transform complex security frameworks into practical audit workflows.
AuditNIST Pro converts cybersecurity frameworks such as NIST CSF, ISO 27001, CIS Controls, and COBIT into structured audit checklists that security auditors can evaluate quickly and consistently.
The project follows a local-first architecture, allowing audits to run entirely in the browser without requiring a backend.

🌍 Language
English | Español

🎯 Project Vision
Cybersecurity frameworks are powerful but often difficult to operationalize in real audits.
AuditNIST Pro aims to solve this by:

transforming frameworks into structured machine-readable models
converting controls into practical audit units
allowing auditors to evaluate compliance and risk quickly
generating structured audit summaries and reports

The long-term goal is to evolve toward a modular GRC audit engine capable of supporting multiple frameworks.

⚙️ Core Architecture
The project is structured into three layers.
UI Layer
Responsible for the audit interface and reporting.
ui/auditnist-local.html
Features:

audit checklist interface
control evaluation
report generation
charts and summaries
multilingual interface

Runs entirely in the browser.

Audit Engine
Core logic responsible for framework management.
core/auditEngine.js
Responsibilities:

manage selected framework
load framework adapters
maintain control structures
coordinate evaluation logic

Uses a framework adapter pattern.

Risk Engine
core/riskEngine.js
Responsible for calculating compliance and risk summaries.
Current scoring model:
compliant     → low risk
partial       → medium risk
non-compliant → high risk
Future versions will implement more advanced risk scoring.

🧩 Framework Adapters
Framework support is implemented using adapters.
frameworks/
├─ nist-csfAdapter.js
├─ iso27001Adapter.js
├─ cisAdapter.js
└─ cobitAdapter.js
Each adapter provides:
getKey()
getName()
getCategories()
getControlsByDomain()
getControlPlaceholder()
getAIContext()
This allows the engine to support multiple frameworks without modifying core logic.

📊 Supported Frameworks
FrameworkStatusNIST CSF 2.0✅ ImplementedISO 27001:2022✅ ImplementedCIS Controls v8✅ ImplementedCOBIT 2019✅ Implemented
Backend multi-framework architecture is complete.
Current work focuses on UI integration and reporting improvements.

🚀 Getting Started
Clone the repository:
bashgit clone https://github.com/SUALBA/AudiNist_Pro
Open the application:
ui/auditnist-local.html
No backend required.

🛠 Development Focus
Current work focuses on improving the multi-framework user experience.
High Priority

dynamic category dropdown based on framework
dynamic control ID placeholder
framework persistence in saved audits
improved reporting structure

Medium Priority

improved risk scoring model
cross-framework mapping
improved audit summaries

Long Term

multi-audit management
collaboration features
enterprise reporting


🟢 Good First Issues
The following tasks are suitable for new contributors and help improve the project without modifying the core architecture.

1. Improve PDF Report Layout
Enhance the generated PDF report to make it more readable and professional.
Possible improvements:

Better spacing and formatting
Add section titles
Highlight risk levels
Improve typography


2. Add JSON Audit Export
Implement the option to export audit results as a JSON file.
Example output format:
json{
  "framework": "NIST CSF",
  "controls": {
    "PR.AC-01": {
      "compliance": "partial",
      "risk": "medium",
      "evidence": "IAM policy exists"
    }
  }
}
This would allow integration with other tools.

3. Improve Control Search
Add a search field to filter controls by:

control ID
keyword
framework category

This would make audits faster for large frameworks.

4. Domain-Based Control Generation
Currently auditors manually type control IDs.
Improve the system so that when a framework domain is selected, the system automatically suggests or generates the corresponding controls.

5. Improve Risk Visualization
Enhance the risk dashboard by adding:

risk distribution visualization
domain-level risk summaries
clearer chart labels


6. Improve Framework Adapters
Review and improve framework adapters:

verify control mappings
ensure correct domain grouping
improve naming consistency

Frameworks currently supported:

NIST CSF
ISO 27001
CIS Controls
COBIT


7. UI Improvements
Improve usability of the interface.
Possible ideas:

collapsible control sections
better form layout
clearer control labels
mobile responsiveness


8. Documentation Improvements
Improve project documentation:

architecture explanation
adapter documentation
developer guidelines


🧩 Contribution Opportunities
The project is actively evolving and contributions are welcome.
UI Integration

 Dynamic category dropdown based on selected framework
 Dynamic control ID placeholder (NIST → PR.AC-1, ISO → A.5.1, etc.)
 Update UI when framework changes
 Improve framework selector UX


Reporting Improvements

 Add framework name in PDF reports
 Add framework name in TXT reports
 Framework-aware report filename (e.g. Audit_ISO27001_RPT001.pdf)
 Improve report layout and readability


Persistence

 Save selected framework in localStorage
 Restore framework when application loads
 Store framework metadata when saving audit JSON


Risk Engine Improvements

 Implement configurable risk scoring
 Support likelihood × impact scoring model
 Improve compliance summary calculations


Developer Experience

 Add unit tests for AuditEngine
 Add unit tests for RiskEngine
 Improve project documentation
 Improve code comments in framework adapters


🤝 Contributing
Contributions are welcome.
Please read CONTRIBUTING.md before opening a pull request.
Steps to contribute:

Fork the repository
Create a feature branch
Implement the improvement
Submit a Pull Request


Please avoid modifying the core architecture unless the change is discussed first.


🔐 Security Notice
AuditNIST Pro is an audit assistance tool.
It does not replace professional cybersecurity audits or regulatory certifications.
Audit results should always be reviewed by qualified security professionals.

📜 License
MIT License

⭐ Support the Project
If you find this project useful:

give the repository a star ⭐
open issues for improvements
contribute new framework adapters