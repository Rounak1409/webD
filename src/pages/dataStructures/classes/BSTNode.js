// immutable BSTNode
class BSTNode {
  constructor(key, val, left, right, parent) {
    this.key = key;
    this.val = val;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }

  setLeft(leftChild) {
    return new BSTNode(this.key, this.val, leftChild, this.right, this.parent);
  }

  setRight(rightChild) {
    return new BSTNode(this.key, this.val, this.left, rightChild, this.parent);
  }

  setParent(parent) {
    return new BSTNode(this.key, this.val, this.left, this.right, parent);
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
        return this.setLeft(newNode.setParent(this));
      } else {
        const newLeftChild = this.left.add(newNode);
        return new BSTNode(
          this.key,
          this.val,
          newLeftChild,
          this.right,
          this.parent,
        );
      }
    } else {
      if (this.right === null) {
        return this.setRight(newNode.setParent(this));
      } else {
        const newRightChild = this.right.add(newNode);
        return new BSTNode(
          this.key,
          this.val,
          this.left,
          newRightChild,
          this.parent,
        );
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

  /*
  successor(key) {
    const nearestNode = this.search(key);

  }

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
