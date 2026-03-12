import { RiskEngine } from "./riskEngine.js";
import { FRAMEWORKS } from "./frameworkRegistry.js";

export class AuditEngine {

  constructor() {
    this.controls = [];
    this.framework = "nist-csf";
  }

  setFramework(fwKey) {
    if (FRAMEWORKS[fwKey]) {
      this.framework = fwKey;
    }
  }

  getFrameworkConfig() {
    return FRAMEWORKS[this.framework];
  }

  loadControls(controlsArray = []) {
    this.controls = controlsArray;
  }

  getSummary() {
    return RiskEngine.calculateSummary(this.controls);
  }

  reset() {
    this.controls = [];
  }
}