import BSTNode from './BSTNode';

// BSTNode wrapper class (immutable)
class TreeData {
  constructor(rootNode) {
    if (rootNode === null) {
      this.rootNode = new BSTNode(10, 5, null, null);
    } else {
      this.rootNode = rootNode;
    }
  }

  search(key) {
    this.rootNode.search(key);
  }

  add(key, val) {
    const newNode = new BSTNode(key, val, null, null);
    const newRootNode = this.rootNode.add(newNode);
    return new TreeData(newRootNode);
  }

  delete(key) {}

  getData() {
    return this.rootNode.getData();
  }
}

export default TreeData;
