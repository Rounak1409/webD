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

  // called from the root, tests on random input insertion / deletion, making sure checkRI and checkPtrs are true
  testRandom() {
    const presentNum = [10];
    for (let i = 0; i < 1000; i++) {
      let randInt = Math.floor(Math.random() * 2);
      if (randInt === 0) {
        // deletion
        if (presentNum.length === 1) {
          continue;
        }
        let randIndex = Math.floor(Math.random() * presentNum.length);
        const deleteKey = presentNum[randIndex];
        this.delete(deleteKey);
        presentNum.splice(randIndex, 1);
      } else {
        // insertion
        let insertKey = Math.floor(Math.random() * 100);
        while (presentNum.includes(insertKey)) {
          insertKey = Math.floor(Math.random() * 100);
        }
        this.add(insertKey);
        presentNum.push(insertKey);
      }
    }
    return new AVLTreeData(this.rootNode);
  }

  search(key) {
    const searchedNode = this.rootNode.search(key);
    return searchedNode;
  }

  add(key) {
    const newNode = new AVLNode(key, null, null, null, 0);
    this.rootNode.add(newNode);
    const balancedNode = this.rootNode.balanceAllViolation(newNode);
    if (balancedNode !== this.rootNode) {
      this.rootNode = balancedNode;
    }
    if (!this.rootNode.checkPtrs) {
      console.log(this.rootNode.checkPtrs());
    }
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
    if (!this.rootNode.checkPtrs) {
      console.log(this.rootNode.checkPtrs());
    }
    this.rootNode.checkRI();
    return new AVLTreeData(this.rootNode);
  }

  getData() {
    return this.rootNode.getData();
  }
}

export default AVLTreeData;
