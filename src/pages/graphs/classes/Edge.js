class Edge {
  constructor(nodeA, nodeB, weight = 1) {
    this.nodeA = nodeA;
    this.nodeB = nodeB;
    this.weight = weight;
  }

  containsNode(node) {
    return this.nodeA=== node|| this.nodeB=== node;
  }
}

export default Edge;
