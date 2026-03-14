export class CobitAdapter {
  constructor() {
    this.key = "cobit";
    this.name = "COBIT 2019";
    this.domains = {
      "EDM": [
        { code: "EDM01", name: "Ensure Governance Framework Setting and Maintenance" },
        { code: "EDM02", name: "Ensure Benefits Delivery" },
        { code: "EDM03", name: "Ensure Risk Optimization" },
        { code: "EDM04", name: "Ensure Resource Optimization" },
        { code: "EDM05", name: "Ensure Stakeholder Engagement" }
      ],
      "APO": [
        { code: "APO01", name: "Manage the IT Management Framework" },
        { code: "APO02", name: "Manage Strategy" },
        { code: "APO03", name: "Manage Enterprise Architecture" },
        { code: "APO04", name: "Manage Innovation" },
        { code: "APO05", name: "Manage Portfolio" },
        { code: "APO06", name: "Manage Budget and Costs" },
        { code: "APO07", name: "Manage Human Resources" },
        { code: "APO08", name: "Manage Relationships" },
        { code: "APO09", name: "Manage Service Agreements" },
        { code: "APO10", name: "Manage Vendors" },
        { code: "APO11", name: "Manage Quality" },
        { code: "APO12", name: "Manage Risk" },
        { code: "APO13", name: "Manage Security" },
        { code: "APO14", name: "Manage Data" }
      ],
      "BAI": [
        { code: "BAI01", name: "Manage Programmes" },
        { code: "BAI02", name: "Manage Requirements Definition" },
        { code: "BAI03", name: "Manage Solutions Identification and Build" },
        { code: "BAI04", name: "Manage Availability and Capacity" },
        { code: "BAI05", name: "Manage Organizational Change" },
        { code: "BAI06", name: "Manage IT Changes" },
        { code: "BAI07", name: "Manage IT Change Acceptance and Transitioning" },
        { code: "BAI08", name: "Manage Knowledge" },
        { code: "BAI09", name: "Manage Assets" },
        { code: "BAI10", name: "Manage Configuration" },
        { code: "BAI11", name: "Manage Projects" }
      ],
      "DSS": [
        { code: "DSS01", name: "Manage Operations" },
        { code: "DSS02", name: "Manage Service Requests and Incidents" },
        { code: "DSS03", name: "Manage Problems" },
        { code: "DSS04", name: "Manage Continuity" },
        { code: "DSS05", name: "Manage Security Services" },
        { code: "DSS06", name: "Manage Business Process Controls" }
      ],
      "MEA": [
        { code: "MEA01", name: "Manage Performance and Conformance Monitoring" },
        { code: "MEA02", name: "Manage System of Internal Control" },
        { code: "MEA03", name: "Manage Compliance with External Requirements" },
        { code: "MEA04", name: "Manage Assurance" }
      ]
    };
  }

  getKey()                    { return this.key; }
  getName()                   { return this.name; }
  getCategories()             { return Object.keys(this.domains); }
  getControlsByDomain(domain) { return this.domains[domain] || []; }
  getControlPlaceholder()     { return "EDM01"; }
  getAIContext()              { return "COBIT 2019 governance framework"; }
}
