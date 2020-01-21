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

export const addEdge = newEdge => {
  return {
    type: 'ADD_EDGE',
    edge: newEdge,
  };
};

export const delEdge = rmEdge => {
  return {
    type: 'DEL_EDGE',
    edge: rmEdge,
  };
};
