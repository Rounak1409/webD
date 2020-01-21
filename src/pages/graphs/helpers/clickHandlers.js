import React from 'react';
import {NODE, EDGE, ADD, DEL} from './constants';
import {message} from 'antd';
import Node from '../classes/Node';
import {reset, addNode, delNode, addEdge, delEdge} from '../../../redux/graphActions';

export const onClickReset = (setNodes, setEdges, setCurrState, dispatch) => {
  setNodes([]);
  setEdges([]);
  setCurrState({
    element: NODE,
    operation: ADD,
  });
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

export const printEdgesSelected = currState => {
  if (currState.element === EDGE) {
    if (currState.nodeA) {
      return (
        <h1>
          First Node: <b>Node {currState.nodeA.id}</b>
        </h1>
      );
    } else {
      return (
        <h1>
          First Node: <b>unselected</b>
        </h1>
      );
    }
  } else {
    return <div />;
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
    //draw edge from nodeA to node
    const temp = [];
    for (let i = 0; i < edges.length; i++) {
      temp.push(edges[i]);
    }
    const newEdge = [currState.nodeA, node];
    temp.push(newEdge);
    setEdges(temp);
    dispatch(addEdge(newEdge));
  } else {
    //set nodeA to node
    setCurrState({
      element: currState.element,
      operation: currState.operation,
      nodeA: node,
    });
  }
};
