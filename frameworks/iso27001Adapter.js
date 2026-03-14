export class IsoAdapter {
  getKey() { return "iso27001"; }

  getName() { return "ISO 27001:2022"; }

  getCategories() {
    return ["Organizational", "People", "Physical", "Technological"];
  }

  getControlPlaceholder() {
    return "A.5.1";
  }

  getAIContext() {
    return "ISO 27001:2022 controls";
  }
}