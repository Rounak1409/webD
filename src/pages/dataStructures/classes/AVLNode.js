// mutable BSTNode
class AVLNode {
  constructor(key, left, right, parent, height) {
    this.key = key;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.height = height;
  }

  // check rep invariant that diff in heght of childs is < 2
  // and height of parent = max(left.height, right.height) + 1
  checkRI() {
    const leftChildHeight = this.left === null ? -1 : this.left.height;
    const rightChildHeight = this.right === null ? -1 : this.right.height;
    if (Math.abs(leftChildHeight - rightChildHeight) >= 2) {
      console.log(`RI INVALID! ${this.key}`);
    }
    if (Math.max(leftChildHeight, rightChildHeight) + 1 !== this.height) {
      console.log(`HEIGHT INVALID! ${this.key}`);
    }
    if (this.left) {
      this.left.checkRI();
    }
    if (this.right) {
      this.right.checkRI();
    }
  }

  // make sure parent pointers of child and child pointers are set correctly
  // i.e. parent <-> child
  checkPtrs() {
    let checkLeft = true;
    let checkRight = true;

    if (this.left !== null) {
      checkLeft = this.left.parent === this;
      checkLeft = checkLeft && this.left.checkPtrs();
    } else if (this.right !== null) {
      checkRight = this.right.parent === this;
      checkRight = checkRight && this.right.checkPtrs();
    }

    return checkLeft && checkRight;
  }

  setLeft(leftChild) {
    this.left = leftChild;
  }

  setRight(rightChild) {
    this.right = rightChild;
  }

  setParent(parent) {
    this.parent = parent;
  }

  setHeight(height) {
    this.height = height;
  }

  // recomputes its height based on child height
  maintainHeight() {
    const leftChildHeight = this.left === null ? -1 : this.left.height;
    const rightChildHeight = this.right === null ? -1 : this.right.height;
    this.setHeight(Math.max(leftChildHeight, rightChildHeight) + 1);
  }

  // called from root
  balanceOneViolation(violatedNode) {
    let res;
    if (violatedNode.isLeftHeavy()) {
      // left child exists
      if (violatedNode.left.isLeftHeavy()) {
        // both violated node and violated node's left child is left heavy, can do right rotate
        res = violatedNode.left.rightRotate();
      } else if (violatedNode.left.isRightHeavy()) {
        // violated node left heavy and violated node's left child right heavy, do left rotate on violated node's left child's right child,
        // then do right rotate on violated node's left child
        const newViolatedNodeLeftChild = violatedNode.left.right.leftRotate();
        res = newViolatedNodeLeftChild.rightRotate();
      } else {
        // violated node left heavy and violated node's left child balanced, can do right rotate
        res = violatedNode.left.rightRotate();
      }
    } else {
      // right child exists
      // violated node right heavy
      if (violatedNode.right.isRightHeavy()) {
        // both violated node and violated node's right child is right heavy, can do left rotate
        res = violatedNode.right.leftRotate();
      } else if (violatedNode.right.isLeftHeavy()) {
        // violated node right heavy and violated node's right child left heavy, do right rotate on violated node's right child's left child,
        // then do left rotate on violated node's right child
        const newViolatedNodeRightChild = violatedNode.right.left.rightRotate();
        res = newViolatedNodeRightChild.leftRotate();
      } else {
        // violated node right heavy and violated node's right child balanced, can do left rotate
        res = violatedNode.right.leftRotate();
      }
    }
    return res;
  }

  balanceAllViolation(startNode) {
    let balancedNode;

    while (startNode !== null) {
      const leftChildHeight =
        startNode.left === null ? -1 : startNode.left.height;
      const rightChildHeight =
        startNode.right === null ? -1 : startNode.right.height;
      if (Math.abs(leftChildHeight - rightChildHeight) >= 2) {
        // violated node
        balancedNode = this.balanceOneViolation(startNode);
      } else {
        balancedNode = startNode;
      }
      startNode = balancedNode.parent;
    }
    return balancedNode;
  }

  isLeftHeavy() {
    const leftChildHeight = this.left === null ? -1 : this.left.height;
    const rightChildHeight = this.right === null ? -1 : this.right.height;
    return leftChildHeight > rightChildHeight;
  }

  isRightHeavy() {
    const leftChildHeight = this.left === null ? -1 : this.left.height;
    const rightChildHeight = this.right === null ? -1 : this.right.height;
    return rightChildHeight > leftChildHeight;
  }

  rightRotate() {
    let parent = this.parent;
    let grandparent = parent.parent;

    parent.setLeft(this.right);
    if (this.parent.left) {
      parent.left.setParent(parent);
    }

    parent.setParent(this);
    this.setRight(parent);

    this.setParent(grandparent);
    if (grandparent) {
      if (grandparent.right === parent) {
        grandparent.setRight(this);
      } else {
        //parent is left child
        grandparent.setLeft(this);
      }
    }
    parent.maintainHeight();
    this.maintainHeight();

    parent = this.parent;
    while (parent !== null) {
      parent.maintainHeight();
      parent = parent.parent;
    }
    return this;
  }

  leftRotate() {
    let parent = this.parent;
    let grandparent = parent.parent;

    parent.setRight(this.left);
    if (this.parent.right) {
      parent.right.setParent(parent);
    }

    parent.setParent(this);
    this.setLeft(parent);

    this.setParent(grandparent);
    if (grandparent) {
      if (grandparent.right === parent) {
        grandparent.setRight(this);
      } else {
        //parent is left child
        grandparent.setLeft(this);
      }
    }
    parent.maintainHeight();
    this.maintainHeight();

    parent = this.parent;
    while (parent !== null) {
      parent.maintainHeight();
      parent = parent.parent;
    }
    return this;
  }

  search(key) {
    if (this.key === key) {
      return this;
    }

    if (this.isLeaf()) {
      return this;
    }

    if (key < this.key) {
      return this.left === null ? this : this.left.search(key);
    } else {
      return this.right === null ? this : this.right.search(key);
    }
  }

  add(newNode) {
    if (newNode.key < this.key) {
      if (this.left === null) {
        newNode.setParent(this);
        this.setLeft(newNode);
      } else {
        this.left.add(newNode);
      }
    } else {
      if (this.right === null) {
        newNode.setParent(this);
        this.setRight(newNode);
      } else {
        this.right.add(newNode);
      }
    }
    this.maintainHeight();
  }

  findMin() {
    if (this.left !== null) {
      return this.left.findMin();
    } else {
      return this;
    }
  }

  findMax() {
    if (this.right !== null) {
      return this.right.findMax();
    } else {
      return this;
    }
  }

  successor(key) {
    let nearestNode = this.search(key);

    if (nearestNode.key > key) {
      return nearestNode;
    }

    // else, find successor of nearestNode
    if (nearestNode.right !== null) {
      return nearestNode.right.findMin();
    } else {
      // no right child, travel up parent pointer until it branches to right

      let nearestNodeParent = nearestNode.parent;
      while (nearestNodeParent !== null) {
        if (nearestNodeParent.left === nearestNode) {
          return nearestNodeParent;
        }

        nearestNode = nearestNodeParent;
        nearestNodeParent = nearestNode.parent;
      }
      return null;
    }
  }

  predeccesor(key) {
    let nearestNode = this.search(key);

    if (nearestNode.key < key) {
      return nearestNode;
    }

    // else, find successor of nearestNode
    if (nearestNode.left !== null) {
      return nearestNode.left.findMax();
    } else {
      // no left child, travel up parent pointer until it branches to left

      let nearestNodeParent = nearestNode.parent;
      while (nearestNodeParent !== null) {
        if (nearestNodeParent.right === nearestNode) {
          return nearestNodeParent;
        }

        nearestNode = nearestNodeParent;
        nearestNodeParent = nearestNode.parent;
      }
      return null;
    }
  }

  // this == root
  delete(delNode) {
    const rootNode = this;
    const parentNode = delNode.parent;

    if (delNode.isLeaf()) {
      // no children, just delete from parent
      if (parentNode.left === delNode) {
        parentNode.setLeft(null);
      } else {
        // right child
        parentNode.setRight(null);
      }

      // update heights
      let parent = parentNode;
      while (parent !== null) {
        parent.maintainHeight();
        parent = parent.parent;
      }

      // balance violations (if any) from parentNode up towards the root
      return this.balanceAllViolation(parentNode);
    } else if (delNode.left === null && delNode.right) {
      // 1 child, just link the searchedNode child and searchedNode parent
      delNode.right.setParent(parentNode);
      if (parentNode !== null) {
        if (parentNode.left === delNode) {
          parentNode.setLeft(delNode.right);
        } else {
          // right child
          parentNode.setRight(delNode.right);
        }
        // update heights
        let parent = parentNode;
        while (parent !== null) {
          parent.maintainHeight();
          parent = parent.parent;
        }
        return this.balanceAllViolation(parentNode);
      } else {
        // deleting root
        return delNode.right;
      }
    } else if (delNode.left && delNode.right === null) {
      delNode.left.setParent(parentNode);
      if (parentNode !== null) {
        if (parentNode.left === delNode) {
          parentNode.setLeft(delNode.left);
        } else {
          // right child
          parentNode.setRight(delNode.left);
        }
        // update heights
        let parent = parentNode;
        while (parent !== null) {
          parent.maintainHeight();
          parent = parent.parent;
        }
        return this.balanceAllViolation(parentNode);
      } else {
        // deleting root
        return delNode.left;
      }
    } else {
      // 2 children
      const successorNode = delNode.right.findMin();
      const succRightChild = successorNode.right;
      const succParent = successorNode.parent;
      const succIsRightChild = succParent.right === successorNode;

      delNode.left.setParent(successorNode);
      delNode.right.setParent(successorNode);
      successorNode.left = delNode.left;
      successorNode.right = delNode.right;

      successorNode.setParent(delNode.parent);
      if (delNode.parent !== null) {
        if (delNode.parent.left === delNode) {
          delNode.parent.setLeft(successorNode);
        } else {
          // delNode is right child
          delNode.parent.setRight(successorNode);
        }
      }

      if (delNode.key === succParent.key) {
        delNode.setParent(successorNode);
        if (succIsRightChild) {
          successorNode.setRight(delNode);
        } else {
          successorNode.setLeft(delNode);
        }
      } else {
        delNode.setParent(succParent);
        if (succIsRightChild) {
          succParent.setRight(delNode);
        } else {
          succParent.setLeft(delNode);
        }
      }

      delNode.setLeft(null);
      if (succRightChild !== null) {
        succRightChild.setParent(delNode);
      }
      delNode.setRight(succRightChild);

      return this.delete(delNode);
    }
  }

  isLeaf() {
    return this.left === null && this.right === null;
  }

  getData() {
    const children = [];

    if (this.left !== null) {
      children.push(this.left.getData());
    }

    if (this.right !== null) {
      children.push(this.right.getData());
    }

    return {
      name: this.key,
      attributes: {
        Height: this.height,
      },
      children,
    };
  }
}

export default AVLNode;
