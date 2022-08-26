class Node {
    constructor(label, userID, initialValue=0) {
        this.label = label;
        this.userID = userID;
        this.initialValue = initialValue;
    }    
}

class Edge {
    constructor(input, output, formula, isTaxable=false) {
        this.input = input;
        this.output = output;
        this.formula = formula;
        this.isTaxable = isTaxable;
    }
}

export {
    Node,
    Edge,
}