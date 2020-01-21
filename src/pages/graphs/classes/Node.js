class Node {
  constructor(x, y, id, costToReach = Number.MAX_SAFE_INTEGER) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.costToReach = costToReach;
  }
}

export default Node;
