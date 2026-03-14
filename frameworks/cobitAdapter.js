export class CobitAdapter {
  getKey() { return "cobit"; }

  getName() { return "COBIT 2019"; }

  getCategories() {
    return ["EDM", "APO", "BAI", "DSS", "MEA"];
  }

  getControlPlaceholder() {
    return "EDM01";
  }

  getAIContext() {
    return "COBIT 2019 governance framework";
  }
}