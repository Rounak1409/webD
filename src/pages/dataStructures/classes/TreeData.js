import BSTNode from './BSTNode';

// BSTNode wrapper class (immutable) -- pointers are broken in javascript
class TreeData {
  constructor(rootNode) {
    if (rootNode === null) {
      this.rootNode = new BSTNode(10, null, null, null);
    } else {
      this.rootNode = rootNode;
    }
  }

  search(key) {
    const searchedNode = this.rootNode.search(key);
    console.log(searchedNode.key);
    return searchedNode;
  }

  add(key) {
    const newNode = new BSTNode(key, null, null, null);
    this.rootNode.add(newNode);
    console.log(this.rootNode.checkPtrs());
    return new TreeData(this.rootNode);
  }

  findMin() {
    return this.rootNode.findMin();
  }

  findMax() {
    return this.rootNode.findMax();
  }

  succ(key) {
    return this.rootNode.successor(key);
  }

  pred(key) {
    return this.rootNode.predeccesor(key);
  }

  // assuming key exists in tree
  delete(key) {
    const delNode = this.search(key);
    this.rootNode = this.rootNode.delete(delNode);
    console.log(this.rootNode.checkPtrs());
    return new TreeData(this.rootNode);
  }

  getData() {
    return this.rootNode.getData();
  }
}

export default TreeData;
