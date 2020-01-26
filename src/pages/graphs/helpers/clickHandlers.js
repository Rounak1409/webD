import React from 'react';
import {
  NODE,
  EDGE,
  ADD,
  DEL,
  RUN,
  ADDNODEINFO,
  DELNODEINFO,
  ADDEDGEINFO,
  DELEDGEINFO,
  RUNINFO,
} from './constants';
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
  setInfoText,
  setCurrentNode,
  setNeighborNode,
  setShortestPath,
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
  setInfoText(ADDNODEINFO);
  setCurrentNode(null);
  setNeighborNode(null);
  setShortestPath([]);
  dispatch(reset());
};

export const onClickAddNodeButton = (setCurrState, setInfoText) => {
  setCurrState({
    element: NODE,
    operation: ADD,
  });
  setInfoText(ADDNODEINFO);
};

export const onClickDelNodeButton = (setCurrState, setInfoText) => {
  setCurrState({
    element: NODE,
    operation: DEL,
  });
  setInfoText(DELNODEINFO);
};

export const onClickAddEdgeButton = (setCurrState, setInfoText) => {
  setCurrState({
    element: EDGE,
    operation: ADD,
    nodeA: null,
  });
  setInfoText(ADDEDGEINFO);
};

export const onClickDelEdgeButton = (setCurrState, setInfoText) => {
  setCurrState({
    element: EDGE,
    operation: DEL,
    nodeA: null,
  });
  setInfoText(DELEDGEINFO);
};

export const onClickRunButton = (
  setCurrState,
  setStartEndNodePair,
  setInfoText,
) => {
  setCurrState({
    element: null,
    operation: RUN,
    nodeA: null,
  });
  setStartEndNodePair([null, null]);
  setInfoText(RUNINFO);
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
      Math.abs(nodes[i].x - e.clientX) < 80 && // very hacky hardcoding
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

export const onClickDelNode = (
  nodes,
  setNodes,
  node,
  edges,
  setEdges,
  dispatch,
) => {
  const tempNodes = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] !== node) {
      tempNodes.push(nodes[i]);
    }
  }
  const tempEdges = [];
  for (let i = 0; i < edges.length; i++) {
    if (edges[i].nodeA === node || edges[i].nodeB === node) {
      continue;
    } else {
      tempEdges.push(edges[i]);
    }
  }
  setNodes(tempNodes);
  setEdges(tempEdges);
  dispatch(delNode(node));
};

const resetSelectedNode = (currState, setCurrState) => {
  setCurrState({
    element: currState.element,
    operation: currState.operation,
    nodeA: null,
  });
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
        if (
          (edges[i].nodeA === currState.nodeA && edges[i].nodeB === node) ||
          (edges[i].nodeA === node && edges[i].nodeB === currState.nodeA)
        ) {
          //means edge already exists (duplicate)
          resetSelectedNode(currState, setCurrState);
          return message.error('Edge already exists!');
        }
        temp.push(edges[i]);
      }
      const newEdge = new Edge(currState.nodeA, node);
      //const newEdge = [currState.nodeA, node];
      temp.push(newEdge);
      dispatch(addEdge(newEdge));
      resetSelectedNode(currState, setCurrState);
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
    resetSelectedNode(currState, setCurrState);
  } else {
    //set nodeA to node
    setCurrState({
      element: currState.element,
      operation: currState.operation,
      nodeA: node,
    });
    //message.info('Please select the second node');
  }
};
