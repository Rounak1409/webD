export const addNode = newNode => {
  return {
    type: 'ADD_NODE',
    node: newNode,
  };
};

export const delNode = delNode => {
  return {
    type: 'DEL_NODE',
    node: delNode,
  };
};

export const addEdge = (nodeA, nodeB) => {
  return {
    type: 'ADD_EDGE',
    nodes: {
      edgeNodeA: nodeA,
      edgeNodeB: nodeB,
    },
  };
};

export const delEdge = (nodeA, nodeB) => {
  return {
    type: 'DEL_EDGE',
    nodes: {
      nodeA,
      nodeB,
    },
  };
};
