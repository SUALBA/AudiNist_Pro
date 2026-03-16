## 🟢 Good First Issues

The following tasks are suitable for new contributors and help improve the project without modifying the core architecture.

### 1. Improve PDF Report Layout

Enhance the generated PDF report to make it more readable and professional.

Possible improvements:

* Better spacing and formatting
* Add section titles
* Highlight risk levels
* Improve typography

---

### 2. Add JSON Audit Export

Implement the option to export the audit results as a JSON file.

Example output format:

```json
{
  "framework": "NIST CSF",
  "controls": {
    "PR.AC-01": {
      "compliance": "partial",
      "risk": "medium",
      "evidence": "IAM policy exists"
    }
  }
}
```

This would allow integration with other tools.

---

### 3. Improve Control Search

Add a search field to filter controls by:

* control ID
* keyword
* framework category

This would make audits faster for large frameworks.

---

### 4. Domain-Based Control Generation

Currently auditors manually type control IDs.

Improve the system so that when a **framework domain is selected**, the system automatically suggests or generates the corresponding controls.

---

### 5. Improve Risk Visualization

Enhance the risk dashboard by adding:

* risk distribution visualization
* domain-level risk summaries
* clearer chart labels

---

### 6. Improve Framework Adapters

Review and improve framework adapters:

* verify control mappings
* ensure correct domain grouping
* improve naming consistency

Frameworks currently supported:

* NIST CSF
* ISO 27001
* CIS Controls
* COBIT

---

### 7. UI Improvements

Improve usability of the interface.

Possible ideas:

* collapsible control sections
* better form layout
* clearer control labels
* mobile responsiveness

---

### 8. Documentation Improvements

Improve project documentation:

* architecture explanation
* adapter documentation
* developer guidelines

---

## Contribution Guidelines

If you want to contribute:

1. Fork the repository
2. Create a feature branch
3. Implement the improvement
4. Submit a Pull Request

Please avoid modifying the **core architecture** unless the change is discussed first.

---
