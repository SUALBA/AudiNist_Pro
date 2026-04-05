/**
 * ---------------------------------------------------------
 * AuditNIST Pro — Audit Session Model
 * ---------------------------------------------------------
 * Represents a complete audit session including metadata,
 * framework selection, controls, and derived summary.
 * Exposes window.AuditSession for use in auditnist-local.html.
 * ---------------------------------------------------------
 */

export class AuditSession {
  constructor({
    id        = '',
    empresa   = '',
    auditora  = '',
    auditor   = '',
    alcance   = '',
    fecha     = '',
    framework = 'nist-csf'
  } = {}) {
    this.id        = id || `AUD-${Date.now()}`;
    this.empresa   = empresa;
    this.auditora  = auditora;
    this.auditor   = auditor;
    this.alcance   = alcance;
    this.fecha     = fecha || new Date().toLocaleDateString();
    this.framework = framework;
    this.controls  = [];
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  addControl(control) {
    this.controls.push(control);
    this.updatedAt = Date.now();
  }

  /**
   * Returns compliance and risk summary across all controls.
   * Counts unique controls — not evaluations.
   */
  getSummary() {
    const total        = this.controls.length;
    const compliant    = this.controls.filter(c => c.compliance === 'yes').length;
    const partial      = this.controls.filter(c => c.compliance === 'partial').length;
    const nonCompliant = this.controls.filter(c => c.compliance === 'no').length;
    const highRisk     = this.controls.filter(c => c.risk === 'high').length;
    const evaluated    = this.controls.filter(c => c.compliance !== '').length;
    return { total, evaluated, compliant, partial, nonCompliant, highRisk };
  }

  toJSON() {
    return {
      id:        this.id,
      empresa:   this.empresa,
      auditora:  this.auditora,
      auditor:   this.auditor,
      alcance:   this.alcance,
      fecha:     this.fecha,
      framework: this.framework,
      controls:  this.controls.map(c => c.toJSON ? c.toJSON() : c),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  static fromJSON(data = {}) {
    const session    = new AuditSession(data);
    session.controls = (data.controls || []).map(c =>
      window.Control ? window.Control.fromJSON(c) : c
    );
    session.createdAt = data.createdAt ?? Date.now();
    session.updatedAt = data.updatedAt ?? Date.now();
    return session;
  }
}

window.AuditSession = AuditSession;
