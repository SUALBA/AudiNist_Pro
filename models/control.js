/**
 * ---------------------------------------------------------
 * AuditNIST Pro — Control Model
 * ---------------------------------------------------------
 * Represents a single audit control with validation.
 * Exposes window.Control for use in auditnist-local.html.
 * ---------------------------------------------------------
 */

export class Control {
  static VALID_COMPLIANCE = ['yes', 'no', 'partial', ''];
  static VALID_RISK       = ['high', 'medium', 'low', ''];

  constructor({ scfId = '', fwCode = '', name = '', question = '', vertical = '', guidance = '' } = {}) {
    this.scfId      = scfId;
    this.fwCode     = fwCode;
    this.name       = name;
    this.question   = question;
    this.vertical   = vertical;
    this.guidance   = guidance;
    this.compliance = '';
    this.risk       = '';
    this.evidence   = '';
    this.notes      = '';
    this.createdAt  = Date.now();
    this.updatedAt  = Date.now();
  }

  setCompliance(value) {
    const v = (value ?? '').toString();
    if (!Control.VALID_COMPLIANCE.includes(v))
      throw new Error(`Invalid compliance "${v}". Expected: ${Control.VALID_COMPLIANCE.filter(Boolean).join('|')}`);
    this.compliance = v;
    this.updatedAt  = Date.now();
    return this;
  }

  setRisk(value) {
    const v = (value ?? '').toString();
    if (!Control.VALID_RISK.includes(v))
      throw new Error(`Invalid risk "${v}". Expected: ${Control.VALID_RISK.filter(Boolean).join('|')}`);
    this.risk      = v;
    this.updatedAt = Date.now();
    return this;
  }

  setEvidence(text) { this.evidence = String(text ?? ''); this.updatedAt = Date.now(); return this; }
  setNotes(text)    { this.notes    = String(text ?? ''); this.updatedAt = Date.now(); return this; }

  isEvaluated() { return this.compliance !== ''; }
  isCompliant()  { return this.compliance === 'yes'; }
  isPartial()    { return this.compliance === 'partial'; }

  toJSON() {
    return {
      scfId:      this.scfId,
      fwCode:     this.fwCode,
      name:       this.name,
      question:   this.question,
      vertical:   this.vertical,
      compliance: this.compliance,
      risk:       this.risk,
      evidence:   this.evidence,
      notes:      this.notes,
      createdAt:  this.createdAt,
      updatedAt:  this.updatedAt
    };
  }

  static fromJSON(data = {}) {
    const c        = new Control(data);
    c.compliance   = data.compliance ?? '';
    c.risk         = data.risk       ?? '';
    c.evidence     = data.evidence   ?? '';
    c.notes        = data.notes      ?? '';
    c.createdAt    = data.createdAt  ?? Date.now();
    c.updatedAt    = data.updatedAt  ?? Date.now();
    return c;
  }

  /**
   * Returns an array of validation error strings.
   * Empty array means valid.
   */
  static validate(data = {}) {
    const errors = [];
    if (data.compliance !== undefined && !Control.VALID_COMPLIANCE.includes(data.compliance))
      errors.push(`compliance must be: ${Control.VALID_COMPLIANCE.filter(Boolean).join('|')}`);
    if (data.risk !== undefined && !Control.VALID_RISK.includes(data.risk))
      errors.push(`risk must be: ${Control.VALID_RISK.filter(Boolean).join('|')}`);
    return errors;
  }
}

window.Control = Control;
