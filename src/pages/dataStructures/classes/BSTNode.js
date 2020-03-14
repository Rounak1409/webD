// mutable BSTNode
class BSTNode {
  constructor(key, val, left, right, parent) {
    this.key = key;
    this.val = val;
    this.left = left;
    this.right = right;
    this.parent = parent;
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
        return;
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
  }

  findMin() {
    if (this.left !== null) {
      console.log(this.left.getData());
      this.left.findMin();
    } else {
      console.log(`min is ${this.key}`);
    }
  }

  findMax() {
    if (this.right !== null) {
      this.right.findMax();
    } else {
      console.log(`max is ${this.key}`);
    }
  }

  successor(key) {
    let nearestNode = this.search(key);

    if (nearestNode.key > key) {
      console.log(`search: successor of ${key} is ${nearestNode.key}`);
      return;
    }

    // else, find successor of nearestNode
    if (nearestNode.right !== null) {
      nearestNode.right.findMin();
    } else {
      // no right child, travel up parent pointer until it branches to right

      let nearestNodeParent = nearestNode.parent;
      console.log(nearestNodeParent.left.key);
      while (nearestNodeParent !== null) {
        if (nearestNodeParent.left === nearestNode) {
          console.log(`successor of ${key} is ${nearestNodeParent.key}`);
          return;
        }

        nearestNode = nearestNodeParent;
        nearestNodeParent = nearestNode.parent;
      }
      console.log(`no successor found for ${key}`);
    }
  }

  predeccesor(key) {
    let nearestNode = this.search(key);

    if (nearestNode.key < key) {
      console.log(`search: predeccesor of ${key} is ${nearestNode.key}`);
      return;
    }

    // else, find successor of nearestNode
    if (nearestNode.left !== null) {
      nearestNode.left.findMax();
    } else {
      // no left child, travel up parent pointer until it branches to left

      let nearestNodeParent = nearestNode.parent;
      while (nearestNodeParent !== null) {
        if (nearestNodeParent.right === nearestNode) {
          console.log(`predeccesor of ${key} is ${nearestNodeParent.key}`);
          return;
        }

        nearestNode = nearestNodeParent;
        nearestNodeParent = nearestNode.parent;
      }
      console.log(`no predeccesor found for ${key}`);
    }
  }

  /*
    delete(key) {
        if (this.key === key) {
            // delete this node
            
        }
    }
    */

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
        Val: this.val,
      },
      children,
    };
  }
}

export default BSTNode;
