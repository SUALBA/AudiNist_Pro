export class NistAdapter {

  constructor() {
    this.key = "nist-csf";
    this.name = "NIST CSF 2.0";

    this.domains = {
      "Identify": [
        { code: "ID.AM-1", name: "Physical devices and systems inventoried" },
        { code: "ID.GV-1", name: "Cybersecurity policy established" }
      ],
      "Protect": [
        { code: "PR.AC-1", name: "Access control policy and procedures" },
        { code: "PR.DS-1", name: "Data at rest protected" }
      ],
      "Detect": [
        { code: "DE.CM-1", name: "Network monitoring performed" },
        { code: "DE.AE-1", name: "Anomalies detected and analyzed" }
      ],
      "Respond": [
        { code: "RS.RP-1", name: "Response plan executed" },
        { code: "RS.CO-1", name: "Response coordinated with stakeholders" }
      ],
      "Recover": [
        { code: "RC.RP-1", name: "Recovery plan executed" },
        { code: "RC.IM-1", name: "Recovery improvements implemented" }
      ]
    };
  }

  getKey() {
    return this.key;
  }

  getName() {
    return this.name;
  }

  getCategories() {
    return Object.keys(this.domains);
  }

  getControlsByDomain(domain) {
    return this.domains[domain] || [];
  }

  getControlPlaceholder() {
    return "PR.AC-1";
  }

  getAIContext() {
    return "NIST Cybersecurity Framework 2.0";
  }
}