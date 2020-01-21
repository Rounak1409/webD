//change to payload
//add RESET OPTION
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

export const addEdge = (newEdge) => {
  return {
    type: 'ADD_EDGE',
    edge: newEdge
  };
};

export const delEdge = (delEdge) => {
  return {
    type: 'DEL_EDGE',
    edge: delEdge
  }
};
