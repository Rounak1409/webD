class Node {
  constructor(x, y, id, costToReach = Number.MAX_SAFE_INTEGER, parent = null) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.costToReach = costToReach;
    this.parent = parent;
  }
}

export default Node;
