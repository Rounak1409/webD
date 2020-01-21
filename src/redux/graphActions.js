//change to payload
//add RESET OPTION
export const reset = () => {
  return {
    type: 'RESET',
  };
};

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

// edge = Object Edge
export const addEdge = newEdge => {
  return {
    type: 'ADD_EDGE',
    edge: newEdge,
  };
};

// nodePair = [nodeA, nodeB]
export const delEdge = nodePair => {
  return {
    type: 'DEL_EDGE',
    nodePair
  };
};
