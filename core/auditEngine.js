import { RiskEngine } from "./riskEngine.js";

import { NistAdapter } from "../frameworks/nist-csfAdapter.js";
import { IsoAdapter } from "../frameworks/iso27001Adapter.js";
import { CisAdapter } from "../frameworks/cisAdapter.js";
import { CobitAdapter } from "../frameworks/cobitAdapter.js";

export class AuditEngine {

  constructor() {
    this.controls = [];

    this.adapters = {
      "nist-csf": new NistAdapter(),
      "iso27001": new IsoAdapter(),
      "cis": new CisAdapter(),
      "cobit": new CobitAdapter()
    };

    this.frameworkKey = "nist-csf";
  }

  setFramework(key) {
    if (this.adapters[key]) {
      this.frameworkKey = key;
    }
  }

  getAdapter() {
    return this.adapters[this.frameworkKey];
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