export class IsoAdapter {
  constructor() {
    this.key = "iso27001";
    this.name = "ISO 27001:2022";
    this.domains = {
      "Organizational": [
        { code: "A.5.1",  name: "Policies for information security" },
        { code: "A.5.2",  name: "Information security roles and responsibilities" },
        { code: "A.5.3",  name: "Segregation of duties" },
        { code: "A.5.4",  name: "Management responsibilities" },
        { code: "A.5.5",  name: "Contact with authorities" },
        { code: "A.5.6",  name: "Contact with special interest groups" },
        { code: "A.5.7",  name: "Threat intelligence" },
        { code: "A.5.8",  name: "Information security in project management" },
        { code: "A.5.9",  name: "Inventory of information and other associated assets" },
        { code: "A.5.10", name: "Acceptable use of information and other associated assets" },
        { code: "A.5.11", name: "Return of assets" },
        { code: "A.5.12", name: "Classification of information" },
        { code: "A.5.13", name: "Labelling of information" },
        { code: "A.5.14", name: "Information transfer" },
        { code: "A.5.15", name: "Access control" },
        { code: "A.5.16", name: "Identity management" },
        { code: "A.5.17", name: "Authentication information" },
        { code: "A.5.18", name: "Access rights" },
        { code: "A.5.19", name: "Information security in supplier relationships" },
        { code: "A.5.20", name: "Addressing information security within supplier agreements" },
        { code: "A.5.21", name: "Managing information security in the ICT supply chain" },
        { code: "A.5.22", name: "Monitoring, review and change management of supplier services" },
        { code: "A.5.23", name: "Information security for use of cloud services" },
        { code: "A.5.24", name: "Information security incident management planning and preparation" },
        { code: "A.5.25", name: "Assessment and decision on information security events" },
        { code: "A.5.26", name: "Response to information security incidents" },
        { code: "A.5.27", name: "Learning from information security incidents" },
        { code: "A.5.28", name: "Collection of evidence" },
        { code: "A.5.29", name: "Information security during disruption" },
        { code: "A.5.30", name: "ICT readiness for business continuity" },
        { code: "A.5.31", name: "Legal, statutory, regulatory and contractual requirements" },
        { code: "A.5.32", name: "Intellectual property rights" },
        { code: "A.5.33", name: "Protection of records" },
        { code: "A.5.34", name: "Privacy and protection of personal identifiable information" },
        { code: "A.5.35", name: "Independent review of information security" },
        { code: "A.5.36", name: "Compliance with policies, rules and standards for information security" },
        { code: "A.5.37", name: "Documented operating procedures" }
      ],
      "People": [
        { code: "A.6.1", name: "Screening" },
        { code: "A.6.2", name: "Terms and conditions of employment" },
        { code: "A.6.3", name: "Information security awareness, education and training" },
        { code: "A.6.4", name: "Disciplinary process" },
        { code: "A.6.5", name: "Responsibilities after termination or change of employment" },
        { code: "A.6.6", name: "Confidentiality or non-disclosure agreements" },
        { code: "A.6.7", name: "Remote working" },
        { code: "A.6.8", name: "Information security event reporting" }
      ],
      "Physical": [
        { code: "A.7.1",  name: "Physical security perimeters" },
        { code: "A.7.2",  name: "Physical entry" },
        { code: "A.7.3",  name: "Securing offices, rooms and facilities" },
        { code: "A.7.4",  name: "Physical security monitoring" },
        { code: "A.7.5",  name: "Protecting against physical and environmental threats" },
        { code: "A.7.6",  name: "Working in secure areas" },
        { code: "A.7.7",  name: "Clear desk and clear screen" },
        { code: "A.7.8",  name: "Equipment siting and protection" },
        { code: "A.7.9",  name: "Security of assets off-premises" },
        { code: "A.7.10", name: "Storage media" },
        { code: "A.7.11", name: "Supporting utilities" },
        { code: "A.7.12", name: "Cabling security" },
        { code: "A.7.13", name: "Equipment maintenance" },
        { code: "A.7.14", name: "Secure disposal or re-use of equipment" }
      ],
      "Technological": [
        { code: "A.8.1",  name: "User endpoint devices" },
        { code: "A.8.2",  name: "Privileged access rights" },
        { code: "A.8.3",  name: "Information access restriction" },
        { code: "A.8.4",  name: "Access to source code" },
        { code: "A.8.5",  name: "Secure authentication" },
        { code: "A.8.6",  name: "Capacity management" },
        { code: "A.8.7",  name: "Protection against malware" },
        { code: "A.8.8",  name: "Management of technical vulnerabilities" },
        { code: "A.8.9",  name: "Configuration management" },
        { code: "A.8.10", name: "Information deletion" },
        { code: "A.8.11", name: "Data masking" },
        { code: "A.8.12", name: "Data leakage prevention" },
        { code: "A.8.13", name: "Information backup" },
        { code: "A.8.14", name: "Redundancy of information processing facilities" },
        { code: "A.8.15", name: "Logging" },
        { code: "A.8.16", name: "Monitoring activities" },
        { code: "A.8.17", name: "Clock synchronization" },
        { code: "A.8.18", name: "Use of privileged utility programs" },
        { code: "A.8.19", name: "Installation of software on operational systems" },
        { code: "A.8.20", name: "Networks security" },
        { code: "A.8.21", name: "Security of network services" },
        { code: "A.8.22", name: "Segregation of networks" },
        { code: "A.8.23", name: "Web filtering" },
        { code: "A.8.24", name: "Use of cryptography" },
        { code: "A.8.25", name: "Secure development life cycle" },
        { code: "A.8.26", name: "Application security requirements" },
        { code: "A.8.27", name: "Secure system architecture and engineering principles" },
        { code: "A.8.28", name: "Secure coding" },
        { code: "A.8.29", name: "Security testing in development and acceptance" },
        { code: "A.8.30", name: "Outsourced development" },
        { code: "A.8.31", name: "Separation of development, test and production environments" },
        { code: "A.8.32", name: "Change management" },
        { code: "A.8.33", name: "Test information" },
        { code: "A.8.34", name: "Protection of information systems during audit testing" }
      ]
    };
  }

  getKey()                    { return this.key; }
  getName()                   { return this.name; }
  getCategories()             { return Object.keys(this.domains); }
  getControlsByDomain(domain) { return this.domains[domain] || []; }
  getControlPlaceholder()     { return "A.5.1"; }
  getAIContext()              { return "ISO 27001:2022 Annex A controls"; }
}
