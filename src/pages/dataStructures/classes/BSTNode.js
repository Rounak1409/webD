class BSTNode {
  constructor(key, val, left, right) {
    this.key = key;
    this.val = val;
    this.left = left;
    this.right = right;
  }

  setLeft(leftChild) {
    return new BSTNode(this.key, this.val, leftChild, this.right);
  }

  setRight(rightChild) {
    return new BSTNode(this.key, this.val, this.left, rightChild);
  }

  search(key) {
    console.log(`searching for ${key} curr: ${this.key}`);
    if (this.key === key) {
      console.log('found');
      return;
    }

    if (this.isLeaf()) {
      console.log('not found is leaf');
      return;
    }

    if (key < this.key) {
      this.left === null ? console.log('not found') : this.left.search(key);
    } else {
      this.right === null ? console.log('not found') : this.right.search(key);
    }
    return;
  }

  add(newNode) {
    if (newNode.key < this.key) {
      if (this.left === null) {
        return this.setLeft(newNode);
      } else {
        const newLeftChild = this.left.add(newNode);
        return new BSTNode(this.key, this.val, newLeftChild, this.right);
      }
    } else {
      if (this.right === null) {
        return this.setRight(newNode);
      } else {
        const newRightChild = this.right.add(newNode);
        return new BSTNode(this.key, this.val, this.left, newRightChild);
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
        Val: this.val,
      },
      children,
    };
  }
}

export default BSTNode;
