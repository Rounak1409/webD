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
    if (grandparent.right === parent) {
      grandparent.setRight(this);
    } else {
      //parent is left child
      grandparent.setLeft(this);
    }
    parent.maintainHeight();
    this.maintainHeight();

    parent = this.parent;
    while (parent !== null) {
      parent.maintainHeight();
      parent = parent.parent;
    }
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
    if (grandparent.right === parent) {
      grandparent.setRight(this);
    } else {
      //parent is left child
      grandparent.setLeft(this);
    }
    parent.maintainHeight();
    this.maintainHeight();

    parent = this.parent;
    while (parent !== null) {
      parent.maintainHeight();
      parent = parent.parent;
    }
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
      console.log(`min is ${this.key}`);
      return this;
    }
  }

  findMax() {
    if (this.right !== null) {
      return this.right.findMax();
    } else {
      console.log(`max is ${this.key}`);
      return this;
    }
  }

  successor(key) {
    let nearestNode = this.search(key);

    if (nearestNode.key > key) {
      console.log(`search: successor of ${key} is ${nearestNode.key}`);
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
          console.log(`successor of ${key} is ${nearestNodeParent.key}`);
          return nearestNodeParent;
        }

        nearestNode = nearestNodeParent;
        nearestNodeParent = nearestNode.parent;
      }
      console.log(`no successor found for ${key}`);
      return null;
    }
  }

  predeccesor(key) {
    let nearestNode = this.search(key);

    if (nearestNode.key < key) {
      console.log(`search: predeccesor of ${key} is ${nearestNode.key}`);
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
          console.log(`predeccesor of ${key} is ${nearestNodeParent.key}`);
          return nearestNodeParent;
        }

        nearestNode = nearestNodeParent;
        nearestNodeParent = nearestNode.parent;
      }
      console.log(`no predeccesor found for ${key}`);
      return null;
    }
  }

  // this == root, assume not deleting root node
  delete(delNode) {
    console.log(delNode);
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
      return this;
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
        return this;
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
        return this;
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

      this.delete(delNode);
      if (delNode.key === rootNode.key) {
        return successorNode;
      } else {
        return this;
      }
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
