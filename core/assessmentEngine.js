/**
 * ---------------------------------------------------------
 * AuditNIST Pro — Assessment Engine
 * ---------------------------------------------------------
 * Implements SUALBA's scoring model (Issue #17):
 *   ControlScore = StatusScore × RiskMultiplier × FrameworkWeight
 *   OverallScore = TotalAchieved / TotalPossible  (0–1)
 *
 * AI role: deterministic scoring only.
 * Narrative generation is delegated to the local AI model.
 * ---------------------------------------------------------
 */

export class AssessmentEngine {

  // Number of controls per framework (for normalization weight)
  static FRAMEWORK_TOTALS = {
    'nist-csf': 106,
    'iso27001':  93,
    'cis':      153,
    'cobit':     40
  };

  // Base score per compliance status
  static STATUS_SCORES = {
    yes:     1.0,
    partial: 0.5,
    no:      0.0,
    '':      0.0
  };

  // Risk multiplier (higher risk = higher impact on score delta)
  static RISK_MULTIPLIERS = {
    high:   2.5,
    medium: 1.5,
    low:    1.0,
    '':     1.0
  };

  // Security posture bands (checked top-down, first match wins)
  static POSTURE_BANDS = [
    { min: 0.80, label: 'Strong',        color: '#22c55e' },
    { min: 0.60, label: 'Moderate',      color: '#facc15' },
    { min: 0.40, label: 'Elevated Risk', color: '#f97316' },
    { min: 0.00, label: 'High Risk',     color: '#ef4444' }
  ];

  // Maturity level bands (checked top-down, first match wins)
  static MATURITY_BANDS = [
    { min: 0.81, label: 'Optimized'  },
    { min: 0.61, label: 'Managed'    },
    { min: 0.41, label: 'Defined'    },
    { min: 0.21, label: 'Developing' },
    { min: 0.00, label: 'Initial'    }
  ];

  /**
   * Run the full scoring model against a list of evaluated controls.
   *
   * @param {Array<{compliance: string, risk: string, domain: string}>} controls
   * @param {string} frameworkKey  — one of 'nist-csf' | 'iso27001' | 'cis' | 'cobit'
   * @returns {Object} structured assessment result
   */
  static calculate(controls = [], frameworkKey = 'nist-csf') {
    const fwTotal = this.FRAMEWORK_TOTALS[frameworkKey] ?? 100;
    const fwWeight = 1 / fwTotal;

    let totalAchieved        = 0;
    let totalPossible        = 0;
    let highRiskNonCompliant = 0;

    // Per-domain stats for weak-domain detection
    const domainStats = {};

    controls.forEach(ctrl => {
      const statusScore = this.STATUS_SCORES[ctrl.compliance] ?? 0;
      const riskMult    = this.RISK_MULTIPLIERS[ctrl.risk]    ?? 1.0;

      // Max possible = fully compliant (1.0) × same risk multiplier × framework weight
      totalAchieved += statusScore * riskMult * fwWeight;
      totalPossible += 1.0         * riskMult * fwWeight;

      if (ctrl.compliance === 'no' && ctrl.risk === 'high') highRiskNonCompliant++;

      const domain = ctrl.domain || 'General';
      if (!domainStats[domain]) domainStats[domain] = { total: 0, nonCompliant: 0 };
      domainStats[domain].total++;
      if (ctrl.compliance === 'no') domainStats[domain].nonCompliant++;
    });

    const overallScore    = totalPossible > 0 ? totalAchieved / totalPossible : 0;
    const overallScorePct = Math.round(overallScore * 100);

    // ── Posture determination with critical override rules ──────────────────
    let postureObj = this.POSTURE_BANDS.find(b => overallScore >= b.min)
                  ?? this.POSTURE_BANDS[this.POSTURE_BANDS.length - 1];

    if (highRiskNonCompliant >= 10) {
      // Force to High Risk regardless of score
      postureObj = this.POSTURE_BANDS[this.POSTURE_BANDS.length - 1];
    } else if (highRiskNonCompliant >= 5 && postureObj.label === 'Strong') {
      // Cannot be Strong with 5+ high-risk non-compliant controls
      postureObj = this.POSTURE_BANDS[1]; // Moderate
    }

    // ── Maturity level ──────────────────────────────────────────────────────
    const maturityObj = this.MATURITY_BANDS.find(b => overallScore >= b.min)
                     ?? this.MATURITY_BANDS[this.MATURITY_BANDS.length - 1];

    // ── Weak domains (>50% non-compliant) ──────────────────────────────────
    const weakDomains = Object.entries(domainStats)
      .filter(([, s]) => s.total > 0 && s.nonCompliant / s.total > 0.5)
      .map(([domain]) => domain);

    return {
      overallScore,                    // 0–1 float
      overallScorePct,                 // 0–100 integer
      posture:     postureObj.label,   // 'Strong' | 'Moderate' | 'Elevated Risk' | 'High Risk'
      postureColor: postureObj.color,  // hex color for UI badge
      maturity:    maturityObj.label,  // 'Initial' | 'Developing' | 'Defined' | 'Managed' | 'Optimized'
      highRiskNonCompliant,
      weakDomains,
      domainStats,
      frameworkKey,
      controlsEvaluated: controls.length
    };
  }

  /**
   * Get the next maturity level label (for strategic recommendation context).
   */
  static nextMaturity(currentLabel) {
    const order = ['Initial', 'Developing', 'Defined', 'Managed', 'Optimized'];
    const idx = order.indexOf(currentLabel);
    return idx >= 0 && idx < order.length - 1 ? order[idx + 1] : 'Optimized';
  }

  /**
   * Build the structured prompt sent to the local AI model.
   * The model only writes the narrative — it never calculates scores.
   *
   * @param {Object} assessment  — result of calculate()
   * @param {Object} auditData   — { company, auditorFirm, auditor, framework, scope, date, id }
   * @param {Object} stats       — { total, compliant, partial, nonCompliant, highRisk, mediumRisk, lowRisk }
   * @param {string} lang        — active UI language (e.g. 'en', 'es', 'fr')
   * @returns {string} prompt string ready for callLocalModel()
   */
  static buildAIPrompt(assessment, auditData, stats, lang = 'en') {
    const langLabels = {
      en: 'English',
      es: 'Spanish (Español)',
      fr: 'French (Français)',
      de: 'German (Deutsch)',
      pt: 'Portuguese (Português)',
      ar: 'Arabic (العربية)',
      zh: 'Mandarin Chinese (中文)'
    };
    const language = langLabels[lang] || 'English';

    const total      = stats.total      || 0;
    const compliant  = stats.compliant  || 0;
    const partial    = stats.partial    || 0;
    const nonComp    = stats.nonCompliant || 0;
    const highRisk   = stats.highRisk   || 0;
    const medRisk    = stats.mediumRisk || 0;
    const lowRisk    = stats.lowRisk    || 0;

    const pct = n => total > 0 ? `${Math.round((n / total) * 100)}%` : '0%';

    const weakDomainStr = assessment.weakDomains.length > 0
      ? assessment.weakDomains.join(', ')
      : 'None identified';

    const nextLevel = this.nextMaturity(assessment.maturity);

    return `You are a Principal Cybersecurity Auditor with 15+ years of experience in enterprise risk management, regulatory compliance, and security framework assessments (NIST CSF, ISO 27001, CIS Controls, COBIT).

You have just completed a formal security audit. Your task is to produce a concise, authoritative AI Final Assessment narrative for an executive-level audience — board members, CISOs, and external stakeholders. The tone must be professional, objective, and strictly data-driven.

────────────────────────────────────────────────
AUDIT METADATA
────────────────────────────────────────────────
Organization:     ${auditData.company || 'N/A'}
Audit Firm:       ${auditData.auditorFirm || 'N/A'}
Lead Auditor:     ${auditData.auditor || 'N/A'}
Framework:        ${auditData.framework || 'N/A'}
Scope:            ${auditData.scope || 'Not specified'}
Audit Date:       ${auditData.date || 'N/A'}
Report ID:        ${auditData.id || 'N/A'}

────────────────────────────────────────────────
QUANTITATIVE SCORING RESULTS
────────────────────────────────────────────────
Overall Security Score:     ${assessment.overallScorePct}%  (risk-weighted, normalized per ${auditData.framework})
Security Posture:           ${assessment.posture}
Maturity Level:             ${assessment.maturity}

Control Breakdown:
  Total Controls Evaluated: ${total}
  Compliant:                ${compliant}  (${pct(compliant)})
  Partial Compliance:       ${partial}    (${pct(partial)})
  Non-Compliant:            ${nonComp}   (${pct(nonComp)})

Risk Distribution:
  High Risk:    ${highRisk}
  Medium Risk:  ${medRisk}
  Low Risk:     ${lowRisk}

Critical Findings:
  High-Risk Non-Compliant Controls:  ${assessment.highRiskNonCompliant}
  Weak Domains (>50% non-compliant): ${weakDomainStr}

────────────────────────────────────────────────
INSTRUCTIONS
────────────────────────────────────────────────
Based ONLY on the quantitative data above, generate a professional assessment narrative.

Rules:
- Do NOT invent facts, controls, or findings not supported by the data above
- Do NOT use generic filler — every sentence must reference actual numbers or findings
- Use formal audit language: "The audit reveals...", "Findings indicate...", "Remediation is advised..."
- Each bullet point must be specific, measurable, and actionable
- Respond in ${language}

Return ONLY valid JSON with no markdown, no code fences, no text outside the JSON object:

{
  "executive_summary": "3–4 sentence paragraph. State the overall posture (${assessment.posture}) and score (${assessment.overallScorePct}%), reference the most critical finding, and conclude with the strategic implication for leadership.",
  "strengths": [
    "Specific strength 1 referencing actual compliant control count or score",
    "Specific strength 2",
    "Specific strength 3"
  ],
  "key_gaps": [
    "Specific gap 1 referencing non-compliant controls, weak domains, or high-risk findings",
    "Specific gap 2",
    "Specific gap 3"
  ],
  "immediate_actions": [
    "Priority action 1 — specific, measurable, tied to a critical finding (0–30 days)",
    "Priority action 2"
  ],
  "medium_term_improvements": [
    "Improvement 1 (30–90 day horizon)",
    "Improvement 2"
  ],
  "strategic_recommendations": [
    "Long-term recommendation tied to maturing from ${assessment.maturity} to ${nextLevel}"
  ]
}`;
  }

  /**
   * Deterministic fallback narrative when Ollama is offline.
   * Returns the same JSON structure the AI would produce.
   */
  static buildFallbackNarrative(assessment, auditData, stats) {
    const total     = stats.total     || 0;
    const compliant = stats.compliant || 0;
    const nonComp   = stats.nonCompliant || 0;
    const partial   = stats.partial   || 0;
    const nextLevel = this.nextMaturity(assessment.maturity);
    const weakStr   = assessment.weakDomains.length > 0
      ? `Domains identified as requiring urgent attention: ${assessment.weakDomains.join(', ')}.`
      : 'No individual domains exceeded the critical non-compliance threshold.';

    return {
      executive_summary: `The security audit of ${auditData.company || 'the organization'} under the ${auditData.framework} framework yields an overall risk-weighted score of ${assessment.overallScorePct}%, reflecting a ${assessment.posture} security posture at the ${assessment.maturity} maturity level. Of ${total} controls evaluated, ${compliant} are fully compliant and ${nonComp} require remediation, with ${assessment.highRiskNonCompliant} high-risk non-compliant controls representing the most critical exposure. ${weakStr} Leadership attention is advised to prioritize remediation of high-risk gaps to advance the organization's security maturity.`,
      strengths: [
        `${compliant} of ${total} controls (${total > 0 ? Math.round((compliant/total)*100) : 0}%) demonstrate full compliance, indicating foundational security practices are in place.`,
        `Partial compliance on ${partial} control${partial !== 1 ? 's' : ''} suggests existing process awareness that can be leveraged for accelerated remediation.`,
        `The organization has formally engaged a structured ${auditData.framework} audit process, demonstrating governance commitment.`
      ],
      key_gaps: [
        `${nonComp} non-compliant control${nonComp !== 1 ? 's' : ''} represent direct exposure to regulatory and operational risk.`,
        `${assessment.highRiskNonCompliant} high-risk non-compliant control${assessment.highRiskNonCompliant !== 1 ? 's' : ''} require immediate executive-level escalation.`,
        assessment.weakDomains.length > 0
          ? `Weak domains detected: ${assessment.weakDomains.join(', ')} — each exceeding 50% non-compliance, indicating systemic process failures.`
          : `Partial compliance controls indicate gaps in implementation consistency across the evaluated control set.`
      ],
      immediate_actions: [
        `Initiate a formal remediation plan for all ${assessment.highRiskNonCompliant} high-risk non-compliant controls within 30 days, with defined ownership and milestone dates.`,
        `Conduct a root-cause analysis for each non-compliant control to distinguish process gaps from technology deficiencies.`
      ],
      medium_term_improvements: [
        `Upgrade ${partial} partially compliant controls to full compliance status through documented policy updates and control testing.`,
        `Implement continuous control monitoring to prevent compliance regression between formal audit cycles.`
      ],
      strategic_recommendations: [
        `To progress from maturity level ${assessment.maturity} to ${nextLevel}, the organization should establish a formal GRC (Governance, Risk & Compliance) programme with dedicated ownership, quarterly assessments, and board-level reporting.`
      ]
    };
  }
}

window.AssessmentEngine = AssessmentEngine;
