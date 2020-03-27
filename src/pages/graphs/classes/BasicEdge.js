// stores only the node id instead of the actual node
class BasicEdge {
  constructor(nodeAId, nodeBId, weight = 1) {
    this.nodeAId = nodeAId;
    this.nodeBId = nodeBId;
    this.weight = weight;
  }

  containsNode(nodeId) {
    return this.nodeAId === nodeId || this.nodeBId === nodeId;
  }
}

export default BasicEdge;
