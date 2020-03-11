import BSTNode from './BSTNode';

class TreeData {
  constructor() {
    const rootNode = new BSTNode(10, 5);
    this.data = [rootNode.getData()];
  }

  search(key) {}

  add(key, val) {
    const newNode = new BSTNode(key, val);
  }

  delete(key) {}

  getData() {
    return this.data;
  }
}

export default TreeData;
