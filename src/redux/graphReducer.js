// STATE: OBJ / HASHMAP OF Repr_NODE where Repr_NODE === Array of adj nodes
const graphReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'RESET':
      return {};
    case 'ADD_NODE':
      const newNodeId = action.node.id;
      newState[newNodeId] = [];
      return newState;
    case 'DEL_NODE':
      const delNodeId = action.node.id;
      delete newState[delNodeId];
      console.log(newState, delNodeId);
      for (let node in newState) {
        const newArr = [];
        for (let i = 0; i < newState[node].length; i++) {
          if (newState.node[i] !== delNodeId) {
            newArr.push(newState.node[i]);
          }
        }
        newState[node] = newArr;
      }
      return newState;
    //case 'VISITED_NODE':
    case 'ADD_EDGE':
      const newEdge = action.edge;
      newState[newEdge.nodeA.id].push({
        other: newEdge.nodeB.id,
        weight: newEdge.weight,
      });
      newState[newEdge.nodeB.id].push({
        other: newEdge.nodeA.id,
        weight: newEdge.weight,
      });
      return newState;
    case 'DEL_EDGE':
      const nodePair = action.nodePair;
      let newArr = newState[nodePair[0].id].filter(
        otherWtP => otherWtP.other !== nodePair[1].id, //otherWtP = other-weight-pair
      );
      newState[nodePair[0].id] = newArr;
      newArr = newState[nodePair[1].id].filter(
        otherWtP => otherWtP.other !== nodePair[0].id,
      );
      newState[nodePair[1].id] = newArr;
      return newState;
    default:
      return state;
  }
};

export default graphReducer;
