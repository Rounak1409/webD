import React from 'react';
import {NODE, EDGE, ADD, DEL, RUN} from './constants';
import {message, Button} from 'antd';
import Node from '../classes/Node';
import Edge from '../classes/Edge';
import {
  reset,
  addNode,
  delNode,
  addEdge,
  delEdge,
} from '../../../redux/graphActions';

export const onClickReset = (
  setNodes,
  setEdges,
  setCurrState,
  setLatestNodeId,
  setStartEndNodePair,
  dispatch,
) => {
  setNodes([]);
  setEdges([]);
  setCurrState({
    element: NODE,
    operation: ADD,
  });
  setLatestNodeId(0);
  setStartEndNodePair([null, null]);
  dispatch(reset());
};

export const onClickAddNodeButton = setCurrState => {
  setCurrState({
    element: NODE,
    operation: ADD,
  });
};

export const onClickDelNodeButton = setCurrState => {
  setCurrState({
    element: NODE,
    operation: DEL,
  });
};

export const onClickAddEdgeButton = setCurrState => {
  setCurrState({
    element: EDGE,
    operation: ADD,
    nodeA: null,
  });
};

export const onClickDelEdgeButton = setCurrState => {
  setCurrState({
    element: EDGE,
    operation: DEL,
    nodeA: null,
  });
};

export const onClickRunButton = setCurrState => {
  setCurrState({
    element: null,
    operation: RUN,
    nodeA: null,
  });
};

export const printStatus = (currState, startEndNodePair, dijkstra) => {
  let statusLine, secondStatusLine, thirdStatusLine;
  if (currState.operation === RUN) {
    statusLine = 'RUN DIJKSTRA';
    if (startEndNodePair[0] === null) {
      secondStatusLine = `Start Node: ${startEndNodePair[0]}, End Node: ${startEndNodePair[1]}`;
      thirdStatusLine = 'Please choose a start Node';
    } else if (startEndNodePair[1] === null) {
      secondStatusLine = `Start Node: ${startEndNodePair[0].id}, End Node: ${startEndNodePair[1]}`;
      thirdStatusLine = 'Please choose an end Node';
    } else {
      secondStatusLine = `Start Node: ${startEndNodePair[0].id}, End Node: ${startEndNodePair[1].id}`;
      thirdStatusLine = <Button onClick={dijkstra}>Run Dijkstra!</Button>;
    }
    return (
      <div>
        <h1>{statusLine}</h1>
        <h2>{secondStatusLine}</h2>
        <h2>{thirdStatusLine}</h2>
      </div>
    );
  }
  statusLine = `${currState.operation} ${currState.element}`;
  if (currState.element === EDGE) {
    if (currState.nodeA) {
      return (
        <div>
          <h1>{statusLine}</h1>
          <h2>First Node: Node {currState.nodeA.id}</h2>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{statusLine}</h1>
          <h2>First Node: unselected</h2>
        </div>
      );
    }
  } else {
    return <h1>{statusLine}</h1>;
  }
};

export const handleAddNode = (
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

export const onClickDelNode = (nodes, setNodes, node, dispatch) => {
  const temp = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] !== node) {
      temp.push(nodes[i]);
    }
  }
  setNodes(temp);
  dispatch(delNode(node));
};

// select nodeA for ADD/DEL EDGE
export const onClickSelectNode = (
  node,
  currState,
  setCurrState,
  edges,
  setEdges,
  dispatch,
) => {
  if (currState.nodeA) {
    //add or del edge from nodeA to node
    const temp = [];
    if (currState.operation === ADD) {
      for (let i = 0; i < edges.length; i++) {
        temp.push(edges[i]);
      }
      const newEdge = new Edge(currState.nodeA, node);
      //const newEdge = [currState.nodeA, node];
      temp.push(newEdge);
      dispatch(addEdge(newEdge));
    } else {
      const nodePair = [currState.nodeA, node];
      for (let i = 0; i < edges.length; i++) {
        if (
          edges[i].containsNode(nodePair[0]) &&
          edges[i].containsNode(nodePair[1])
        ) {
          continue;
        } else {
          temp.push(edges[i]);
        }
      }
      dispatch(delEdge(nodePair));
    }
    setEdges(temp);
  } else {
    //set nodeA to node
    setCurrState({
      element: currState.element,
      operation: currState.operation,
      nodeA: node,
    });
  }
};
