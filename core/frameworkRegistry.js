export const FRAMEWORKS = {

  "nist-csf": {
    name: "NIST CSF 2.0",
    categories: ["Identify", "Protect", "Detect", "Respond", "Recover"],
    controlPlaceholder: "PR.AC-1",
    aiContext: "NIST Cybersecurity Framework 2.0"
  },

  "iso27001": {
    name: "ISO 27001:2022",
    categories: ["Organizational", "People", "Physical", "Technological"],
    controlPlaceholder: "A.5.1",
    aiContext: "ISO 27001:2022 controls"
  },

  "cis": {
    name: "CIS Controls v8",
    categories: ["IG1 – Basic", "IG2 – Foundational", "IG3 – Organizational"],
    controlPlaceholder: "CIS 1.1",
    aiContext: "CIS Controls Version 8"
  },

  "cobit": {
    name: "COBIT 2019",
    categories: ["EDM", "APO", "BAI", "DSS", "MEA"],
    controlPlaceholder: "EDM01",
    aiContext: "COBIT 2019 governance framework"
  }

};