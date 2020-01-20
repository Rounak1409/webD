import constants from './constants';
import {message} from 'antd';
import Node from '../classes/Node';
import {addNode, delNode, addEdge, delEdge} from '../../../redux/graphActions';
const {NODE, EDGE, ADD, DEL} = constants;

export default function handleClick(
  e,
  currState,
  nodes,
  latestNodeId,
  setLatestNodeId,
  edges,
  setNodes,
  setEdges,
  dispatch,
) {
  if (currState.element === NODE && currState.operation === ADD) {
    return handleAddNode(
      e,
      nodes,
      latestNodeId,
      setLatestNodeId,
      setNodes,
      dispatch,
    );
  } else if (currState.element === NODE && currState.operation === DEL) {
    return handleDelNode(e, nodes, setNodes, dispatch);
  }

  /*
        case (currState.element === EDGE && currState.operation === ADD):
            handleAddEdge(currState,
        case (currState.element === EDGE && currState.operation === DEL):
    default:
      return;
  }
        */
  return;
}

const handleAddNode = (
  e,
  nodes,
  latestNodeId,
  setLatestNodeId,
  setNodes,
  dispatch,
) => {
  if (e.target.value) {
    return;
  }

  // IMMUTABILITY
  const temp = [];
  for (let i = 0; i < nodes.length; i++) {
    if (
      Math.abs(nodes[i].x - e.clientX) < 80 &&
      Math.abs(nodes[i].y - e.clientY) < 50
    ) {
      message.error('Ensure that there is enough space between the nodes');
      return;
    }
    temp.push(nodes[i]);
  }

  const newNode = new Node(e.clientX, e.clientY, latestNodeId);
  setLatestNodeId(latestNodeId + 1);
  console.log(newNode);
  temp.push(newNode);
  setNodes(temp);
  dispatch(addNode(newNode));
  return newNode;
};

const handleDelNode = (e, nodes, setNodes, dispatch) => {
  if (e.target.value) {
    return;
  }
};

/*
const handleAddNode = () => {};

const handleAddNode = () => {};
*/
