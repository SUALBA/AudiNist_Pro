export class RiskEngine {

  /**
   * Calculate summary metrics based on controls array
   * @param {Array} controls - Array of control objects
   * @returns {Object} summary
   */
  static calculateSummary(controls = []) {
    const summary = {
      total: 0,
      compliant: 0,
      nonCompliant: 0,
      partial: 0,
      high: 0,
      medium: 0,
      low: 0
    };

    summary.total = controls.length;

    controls.forEach(ctrl => {
      switch (ctrl.compliance) {
        case 'yes':
          summary.compliant++;
          if (ctrl.risk === 'low') summary.low++; // compliant controls can still carry a low residual risk
          break;
        case 'no':
          summary.nonCompliant++;
          summary.high++; // default rule: non-compliant = high risk
          break;
        case 'partial':
          summary.partial++;
          summary.medium++; // default rule: partial = medium risk
          break;
      }
    });

    return summary;
  }

}