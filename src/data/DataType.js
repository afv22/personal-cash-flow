class Node {
  constructor(id, label, userID, initialValue = 0) {
    this.id = id;
    this.label = label;
    this.userID = userID;
    this.initialValue = initialValue;
  }
}

class Edge {
  /**
   * Initializes an instance of an Edge
   * @param id: Int - The Edge ID
   * @param sourceId: Int - The source account
   * @param targetId: Int - The destination account
   * @param isPercentage: Boolean - Whether the amount should be read as a percentage of
   *    the input's total value or as a constant value
   * @param amount: Float - The portion of the input Node's total value passed through
   *    this edge
   * @param isTaxable: Boolean - Whether this connection is taxable. If it is, the through
   *    cash will be split accordingly and taxes will flow to the tax node
   */
  constructor(id, sourceId, targetId, isPercentage, amount, isTaxable = false) {
    if (amount < 0) {
      throw "Amount cannot be less than 0.";
    }
    this.id = id;
    this.sourceId = sourceId;
    this.targetId = targetId;
    this.isPercentage = isPercentage;
    if (isPercentage && amount > 1) {
      this.amount = 1;
    } else {
      this.amount = amount;
    }
    this.isTaxable = isTaxable;
  }
}

export { Node, Edge };
