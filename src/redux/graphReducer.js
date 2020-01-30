// STATE: OBJ / HASHMAP OF Repr_NODE where Repr_NODE === Array of adj nodes
const graphReducer = (state = {graph: {}}, action) => {
  const newState = Object.assign({graph: {}}, state);
  switch (action.type) {
    case 'RESET':
      return {graph: {}};
    case 'ADD_NODE':
      const newNodeId = action.node.id;
      newState.graph[newNodeId] = [];
      return newState;
    case 'DEL_NODE':
      const delNodeId = action.node.id;
      delete newState.graph[delNodeId];
      console.log(newState, delNodeId);
      for (let node in newState.graph) {
        const newArr = [];
        for (let i = 0; i < newState.graph[node].length; i++) {
          if (newState.graph[node][i].other !== delNodeId) {
            //delete all edges associated with this node
            newArr.push(newState.graph[node][i]);
          }
        }
        newState.graph[node] = newArr;
      }
      return newState;
    //case 'VISITED_NODE':
    case 'ADD_EDGE':
      const newEdge = action.edge;
      newState.graph[newEdge.nodeA.id].push({
        other: newEdge.nodeB.id,
        weight: newEdge.weight,
      });
      newState.graph[newEdge.nodeB.id].push({
        other: newEdge.nodeA.id,
        weight: newEdge.weight,
      });
      return newState;
    case 'DEL_EDGE':
      const nodePair = action.nodePair;
      let newArr = newState.graph[nodePair[0].id].filter(
        otherWtP => otherWtP.other !== nodePair[1].id, //otherWtP = other-weight-pair
      );
      newState.graph[nodePair[0].id] = newArr;
      newArr = newState.graph[nodePair[1].id].filter(
        otherWtP => otherWtP.other !== nodePair[0].id,
      );
      newState.graph[nodePair[1].id] = newArr;
      return newState;
    default:
      return state;
  }
};

export default graphReducer;
