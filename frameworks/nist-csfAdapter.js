export class NistAdapter {
  constructor() {
    this.key = "nist-csf";
    this.name = "NIST CSF 2.0";
    // Based on NIST Cybersecurity Framework 2.0
    // https://www.nist.gov/cyberframework
    // Estructura completa basada en NIST Cybersecurity Framework 2.0 (Feb 2024)
    // Incluye las 6 Funciones: Govern, Identify, Protect, Detect, Respond, Recover
    this.domains = {
     "Govern": [
        { code: "GV.OC-01", name: "Organizational context understood and established" },
        { code: "GV.OC-02", name: "Supply chain risk management policy established" },
        { code: "GV.OC-03", name: "Roles and responsibilities for cybersecurity defined" },
        { code: "GV.RM-01", name: "Cybersecurity risk management strategy approved" },
        { code: "GV.RM-02", name: "Risk tolerance determined and communicated" },
        { code: "GV.RM-03", name: "Cybersecurity supply chain risk management priorities established" },
        { code: "GV.PO-01", name: "Cybersecurity policies established and communicated" },
        { code: "GV.PO-02", name: "Cybersecurity roles and responsibilities coordinated with stakeholders" },
        { code: "GV.PO-03", name: "Legal and regulatory requirements regarding cybersecurity understood" },
        { code: "GV.ME-01", name: "Cybersecurity performance monitored against objectives" },
        { code: "GV.ME-02", name: "Review of cybersecurity program and strategy conducted" }
      ],
      "Identify": [
        { code: "ID.AM-01", name: "Physical devices and systems inventoried" },
        { code: "ID.AM-02", name: "Software platforms and applications inventoried" },
        { code: "ID.AM-03", name: "Organizational communication and data flows mapped" },
        { code: "ID.AM-04", name: "External information systems cataloged" },
        { code: "ID.AM-05", name: "Resources (hardware, devices, data, time, personnel, software) prioritized" },
        { code: "ID.BE-01", name: "Resilience requirements to support delivery of critical services established" },
        { code: "ID.BE-02", name: "Disruption impacts on critical service delivery estimated" },
        { code: "ID.BE-03", name: "Cybersecurity resilience objectives informed by disruption impacts" },
        { code: "ID.BE-04", name: "Criticality of functions and assets determined" },
        { code: "ID.BE-05", name: "Supply chain risks identified and managed" },
        { code: "ID.GV-01", name: "Cybersecurity policy established and communicated" },
        { code: "ID.GV-02", name: "Cybersecurity governance framework established" },
        { code: "ID.GV-03", name: "Legal and regulatory requirements regarding cybersecurity understood" },
        { code: "ID.RA-01", name: "Asset vulnerabilities identified and documented" },
        { code: "ID.RA-02", name: "Cyber threat intelligence received from information sharing forums" },
        { code: "ID.RA-03", name: "Threats, both internal and external, identified and documented" },
        { code: "ID.RA-04", name: "Potential impact and likelihood of threats identified" },
        { code: "ID.RA-05", name: "Risk responses identified and prioritized" },
        { code: "ID.RA-06", name: "Risk management strategy incorporating risk tolerance established" },
        { code: "ID.SC-01", name: "Supply chain risk management processes established" },
        { code: "ID.SC-02", name: "Suppliers and third-party partners assessed for risk" },
        { code: "ID.SC-03", name: "Contracts with suppliers and third-party partners include cybersecurity requirements" }
      ],
      "Protect": [
        { code: "PR.AC-01", name: "Identities and credentials issued, managed, verified, revoked, and audited" },
        { code: "PR.AC-02", name: "Physical access to assets managed and protected" },
        { code: "PR.AC-03", name: "Remote access managed and protected" },
        { code: "PR.AC-04", name: "Access permissions and authorizations managed, incorporating least privilege" },
        { code: "PR.AC-05", name: "Network integrity protected (e.g., network segregation, separation)" },
        { code: "PR.AC-06", name: "Identities proofed and bound to credentials" },
        { code: "PR.AC-07", name: "Users, devices, and other assets authenticated commensurate with risk" },
        { code: "PR.AT-01", name: "Personnel receive cybersecurity awareness communications" },
        { code: "PR.AT-02", name: "Personnel receive cybersecurity training relevant to their roles" },
        { code: "PR.AT-03", name: "Role-based cybersecurity training provided to privileged users" },
        { code: "PR.AT-04", name: "Personnel trained to recognize and report social engineering and phishing" },
        { code: "PR.DS-01", name: "Data at rest protected" },
        { code: "PR.DS-02", name: "Data in transit protected" },
        { code: "PR.DS-03", name: "Assets formally disposed of, sanitized, or destroyed" },
        { code: "PR.DS-04", name: "Data retention and disposal policies implemented" },
        { code: "PR.DS-05", name: "Protections against data leaks implemented (DLP)" },
        { code: "PR.DS-06", name: "Encryption used to protect confidentiality and integrity" },
        { code: "PR.DS-07", name: "Development and test environments separated from production" },
        { code: "PR.DS-08", name: "Integrity checking mechanisms used to verify software and data" },
        { code: "PR.IR-01", name: "Incident response plan established and communicated" },
        { code: "PR.IR-02", name: "Incident response procedures tested and updated" },
        { code: "PR.IR-03", name: "Incident response team designated and trained" },
        { code: "PR.IR-04", name: "Incident response coordination with external parties established" },
        { code: "PR.MA-01", name: "Maintenance and repairs of organizational assets recorded and logged" },
        { code: "PR.MA-02", name: "Remote maintenance sessions approved and monitored" },
        { code: "PR.MA-03", name: "Tools used for maintenance restricted to authorized personnel" },
        { code: "PR.PT-01", name: "Configuration management process established and maintained" },
        { code: "PR.PT-02", name: "Baseline configurations created and maintained" },
        { code: "PR.PT-03", name: "Least functionality principle applied to systems" },
        { code: "PR.PT-04", name: "System components refreshed or replaced to address vulnerabilities" },
        { code: "PR.PT-05", name: "Mechanisms (e.g., fail-safe, load balancing) implemented to ensure resilience" },
        { code: "PR.PT-06", name: "Minimum functionality necessary for operation retained during updates" },
        { code: "PR.PT-07", name: "Security-relevant changes reviewed and approved prior to implementation" },
        { code: "PR.PT-08", name: "Technology solutions managed to minimize attack surface" }
      ],
      "Detect": [
        { code: "DE.AE-01", name: "Baseline of network operations and expected data flows established" },
        { code: "DE.AE-02", name: "Detected events analyzed to understand attack targets and methods" },
        { code: "DE.AE-03", name: "Event data aggregated and correlated from multiple sources" },
        { code: "DE.AE-04", name: "Impact of incidents determined (e.g., scope, magnitude)" },
        { code: "DE.AE-05", name: "Incident alert thresholds established and tuned" },
        { code: "DE.CM-01", name: "Network traffic monitored for cybersecurity events" },
        { code: "DE.CM-02", name: "Physical environment monitored for cybersecurity events" },
        { code: "DE.CM-03", name: "Personnel activity monitored for cybersecurity events" },
        { code: "DE.CM-04", name: "Third-party and supplier activity monitored" },
        { code: "DE.CM-05", name: "Malicious code detected and analyzed" },
        { code: "DE.CM-06", name: "Unauthorized mobile code detected" },
        { code: "DE.CM-07", name: "Monitoring for unauthorized personnel, connections, devices, and software" },
        { code: "DE.CM-08", name: "Vulnerability scans performed regularly" },
        { code: "DE.CM-09", name: "Penetration testing performed regularly" }
         ],
      "Respond ": [
        { code: "RS.RP-01", name: "Response plan executed during and after an incident" },
        { code: "RS.RP-02", name: "Incident response roles and responsibilities clearly defined" },
        { code: "RS.RP-03", name: "Response plans tested and updated based on lessons learned" },
        { code: "RS.RP-04", name: "Coordination with stakeholders (internal/external) established" },
        { code: "RS.CO-01", name: "Personnel know how to report suspected cybersecurity events" },
        { code: "RS.CO-02", name: "Events reported consistent with response plan criteria" },
        { code: "RS.CO-03", name: "Information shared with response team and stakeholders" },
        { code: "RS.CO-04", name: "Coordination with external law enforcement/regulators as required" },
        { code: "RS.AN-01", name: "Notifications from detection systems investigated" },
        { code: "RS.AN-02", name: "Incident impact categorized and prioritized" },
        { code: "RS.AN-03", name: "Forensic analysis performed to determine root cause" },
        { code: "RS.AN-04", name: "Incidents documented and tracked until resolution" },
        { code: "RS.MI-01", name: "Incidents contained and isolated to prevent spread" },
        { code: "RS.MI-02", name: "Malware and compromised devices remediated" },
        { code: "RS.MI-03", name: "Incident mitigation steps documented and verified" },
        { code: "RS.IM-01", name: "Post-incident review conducted to identify improvements" },
        { code: "RS.IM-02", name: "Response strategies updated based on lessons learned" },
        { code: "RS.IM-03", name: "Communication with stakeholders regarding lessons learned" }
      ],
      "Recover": [
        { code: "RC.RP-01", name: "Recovery plan executed during and after an incident" },
        { code: "RC.RP-02", name: "Recovery plan includes restoration of systems and services" },
        { code: "RC.RP-03", name: "Recovery plans tested and updated based on lessons learned" },
        { code: "RC.RP-04", name: "Redundancy and resilience built into critical systems" },
        { code: "RC.CO-01", name: "Public relations and reputation management plan executed" },
        { code: "RC.CO-02", name: "Stakeholders notified of recovery status" },
        { code: "RC.CO-03", name: "Voluntary information sharing with industry peers" },
        { code: "RC.IM-01", name: "Recovery improvements implemented based on post-incident reviews" },
        { code: "RC.IM-02", name: "Strategies for future resilience updated" },
        { code: "RC.IM-03", name: "Training and awareness updated based on recovery experiences" }
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
    return "ID.AM-01";
  }

  /**
   * Retorna un contexto específico para IA optimizado para NIST CSF 2.0
   * Incluye la nueva función GOVERN y la estructura actualizada.
   */
  getAIContext() {
    return "NIST Cybersecurity Framework (CSF) 2.0. Structure: 6 Functions (Govern, Identify, Protect, Detect, Respond, Recover), 23 Categories. Focus on organizational context, supply chain risk, and resilience. Use official codes (e.g., GV.OC-01, ID.AM-01).";
  }
}