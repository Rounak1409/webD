class BSTNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }

  getData() {
    return {
      name: this.key,
      attributes: {
        Val: this.val,
      },
      children: [],
    };
  }
}

export default BSTNode;
