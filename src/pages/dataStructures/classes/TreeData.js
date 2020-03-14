import BSTNode from './BSTNode';

// BSTNode wrapper class (immutable) -- pointers are broken in javascript
class TreeData {
  constructor(rootNode) {
    if (rootNode === null) {
      this.rootNode = new BSTNode(10, 5, null, null, null);
    } else {
      this.rootNode = rootNode;
    }
  }

  search(key) {
    console.log(this.rootNode.search(key).key);
  }

  add(key, val) {
    const newNode = new BSTNode(key, val, null, null);
    this.rootNode.add(newNode);
    return new TreeData(this.rootNode);
  }

  findMin() {
    this.rootNode.findMin();
  }

  findMax() {
    this.rootNode.findMax();
  }

  succ(key) {
    this.rootNode.successor(key);
  }

  pred(key) {
    this.rootNode.predeccesor(key);
  }

  delete(key) {}

  getData() {
    return this.rootNode.getData();
  }
}

export default TreeData;
