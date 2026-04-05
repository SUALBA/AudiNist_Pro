/**
 * ---------------------------------------------------------
 * AuditNIST Pro — Evaluation Model
 * ---------------------------------------------------------
 * Represents the auditor's assessment of a single control.
 * Enforces valid compliance and risk values at construction.
 * Exposes window.Evaluation for use in auditnist-local.html.
 * ---------------------------------------------------------
 */

export class Evaluation {
  static VALID_COMPLIANCE = ['yes', 'no', 'partial'];
  static VALID_RISK       = ['high', 'medium', 'low', ''];

  constructor({
    scfId,
    auditId,
    compliance,
    risk       = '',
    evidence   = '',
    notes      = '',
    company    = '',
    auditor    = '',
    vertical   = ''
  } = {}) {
    const errors = Evaluation.validate({ scfId, auditId, compliance, risk });
    if (errors.length) throw new Error(errors.join('; '));

    this.scfId      = scfId;
    this.auditId    = auditId;
    this.compliance = compliance;
    this.risk       = risk;
    this.evidence   = String(evidence ?? '');
    this.notes      = String(notes    ?? '');
    this.company    = company;
    this.auditor    = auditor;
    this.vertical   = vertical;
    this.timestamp  = Date.now();
  }

  isCompliant() { return this.compliance === 'yes'; }
  isPartial()   { return this.compliance === 'partial'; }
  isHighRisk()  { return this.risk === 'high'; }

  toJSON() {
    return {
      scfId:      this.scfId,
      auditId:    this.auditId,
      compliance: this.compliance,
      risk:       this.risk,
      evidence:   this.evidence,
      notes:      this.notes,
      company:    this.company,
      auditor:    this.auditor,
      vertical:   this.vertical,
      timestamp:  this.timestamp
    };
  }

  static fromJSON(data = {}) {
    return new Evaluation(data);
  }

  /**
   * Returns an array of validation error strings.
   * Empty array means valid.
   */
  static validate(data = {}) {
    const errors = [];
    if (!data.scfId)
      errors.push('scfId is required');
    if (!data.auditId)
      errors.push('auditId is required');
    if (!Evaluation.VALID_COMPLIANCE.includes(data.compliance))
      errors.push(`compliance must be: ${Evaluation.VALID_COMPLIANCE.join('|')}`);
    if (data.risk && !Evaluation.VALID_RISK.includes(data.risk))
      errors.push(`risk must be: ${Evaluation.VALID_RISK.filter(Boolean).join('|')}`);
    return errors;
  }
}

window.Evaluation = Evaluation;
