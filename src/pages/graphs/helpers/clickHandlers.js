import constants from './constants';
import Node from '../classes/Node';
import {addNode, delNode, addEdge, delEdge} from '../../../redux/graphActions';
const {NODE, EDGE, ADD, DEL} = constants;

export default function handleClick(
  e,
  currState,
  nodes,
  edges,
  setNodes,
  setEdges,
  dispatch,
) {
  console.log(e.target.value);
  if (currState.element === NODE && currState.operation === ADD) {
    return handleAddNode(e, nodes, setNodes, dispatch);
  }
  return;
  /*
    case currState.element === NODE && currState.operation === DEL:
      handleDelNode(e, nodes, setNodes);
      return;
        case (currState.element === EDGE && currState.operation === ADD):
            handleAddEdge(currState,
        case (currState.element === EDGE && currState.operation === DEL):
    default:
      return;
  }
        */
}

const handleAddNode = (e, nodes, setNodes, dispatch) => {
  if (e.target.value) {
    return;
  }

  const newNode = new Node(e.clientX, e.clientY, nodes.length);

  // IMMUTABILITY
  const temp = [];
  for (let i = 0; i < nodes.length; i++) {
    if (
      Math.abs(nodes[i].x - e.clientX) < 80 &&
      Math.abs(nodes[i].y - e.clientY) < 50
    ) {
      return;
    }
    temp.push(nodes[i]);
  }

  console.log(newNode);
  temp.push(newNode);
  setNodes(temp);
  dispatch(addNode(newNode));
  return newNode;
};

/*
const handleDelNode = () => {
    if (e.target.value === 'reset') {
        return;
    }

    const temp = [];
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] !== 
    }
};

const handleAddNode = () => {};

const handleAddNode = () => {};
*/
