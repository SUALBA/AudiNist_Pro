import { AuditEngine } from "../core/auditEngine.js";

export const auditEngine = new AuditEngine();

export function getFrameworkCategories() {
  return auditEngine.getCategories();
}

export function getControls(domain) {
  return auditEngine.getControlsByDomain(domain);
}

export function setFramework(key) {
  auditEngine.setFramework(key);
}

export function getSummary() {
  return auditEngine.getSummary();
}