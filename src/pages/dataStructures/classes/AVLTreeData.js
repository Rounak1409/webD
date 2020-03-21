import AVLNode from './AVLNode';

// BSTNode wrapper class (immutable) -- pointers are broken in javascript
class AVLTreeData {
  constructor(rootNode) {
    if (rootNode === null) {
      this.rootNode = new AVLNode(10, null, null, null, 0);
    } else {
      this.rootNode = rootNode;
    }
  }

  search(key) {
    const searchedNode = this.rootNode.search(key);
    console.log(searchedNode.key);
    return searchedNode;
  }

  rightRotate(key) {
    const searchedNode = this.search(key);
    searchedNode.rightRotate();
    console.log(this.rootNode.checkPtrs());
    this.rootNode.checkRI();
    return new AVLTreeData(this.rootNode);
  }

  leftRotate(key) {
    const searchedNode = this.search(key);
    searchedNode.leftRotate();
    console.log(this.rootNode.checkPtrs());
    this.rootNode.checkRI();
    return new AVLTreeData(this.rootNode);
  }

  add(key) {
    const newNode = new AVLNode(key, null, null, null, 0);
    this.rootNode.add(newNode);
    console.log(this.rootNode.checkPtrs());
    this.rootNode.checkRI();
    return new AVLTreeData(this.rootNode);
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
    if (delNode.key !== key) {
      return this;
    }
    this.rootNode = this.rootNode.delete(delNode);
    console.log(this.rootNode.checkPtrs());
    this.rootNode.checkRI();
    return new AVLTreeData(this.rootNode);
  }

  getData() {
    return this.rootNode.getData();
  }
}

export default AVLTreeData;
