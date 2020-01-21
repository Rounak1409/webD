import React, {useState} from 'react';
import GraphNode from './components/GraphNode';
import Line from './components/Line';
import MenuBar from './components/MenuBar';
import {Alert, message, Button} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
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
} from './helpers/constants';
import {
  onClickReset,
  onClickAddNodeButton,
  onClickDelNodeButton,
  onClickDelNode,
  onClickAddEdgeButton,
  onClickDelEdgeButton,
  onClickRunButton,
  printStatus,
  onClickSelectNode,
  handleAddNode,
} from './helpers/clickHandlers';

function Dijkstra(props) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [currState, setCurrState] = useState({
    element: NODE,
    operation: ADD,
    nodeA: null,
  });
  const [startEndNodePair, setStartEndNodePair] = useState([null, null]);
  const [latestNodeId, setLatestNodeId] = useState(0);
  const [infoText, setInfoText] = useState(ADDNODEINFO);
  const dispatch = useDispatch();
  const readOnlyState = useSelector(state => state);

  const verifyStartEndNodes = node => {
    if (startEndNodePair[0] === null) {
      setStartEndNodePair([node, startEndNodePair[1]]);
    } else if (startEndNodePair[1] === null) {
      setStartEndNodePair([startEndNodePair[0], node]);
    } else {
      message.error('Already selected both start and end Nodes!');
    }
  };

  const dijkstra = () => {
    const helperSort = () => {
      // 'PRIORITY QUEUE'
      nodesQueue.sort((nodeA, nodeB) => {
        if (nodeA.costToReach > nodeB.costToReach) {
          return 1;
        } else {
          return -1;
        }
      });
    };

    console.log('dijkstra-ing...');
    // Make copy of all nodes, set source node cost as 0, rest of node
    // by default has cost of infinity
    const nodesMap = [];
    const nodesQueue = [];
    const isVisited = [];
    for (let i = 0; i < nodes.length; i++) {
      const newNode = Object.assign({}, nodes[i]);
      if (startEndNodePair[0] === nodes[i]) {
        newNode.costToReach = 0;
        //newNode.parent = -1; // indicate source node -> no parent
      }
      nodesQueue.push(newNode);
      nodesMap.push(newNode);
    }

    const dest = startEndNodePair[1];
    while (true) {
      helperSort();
      const nextNode = nodesQueue.shift();
      if (nextNode.id === dest.id) {
        console.log(`cost to reach is ${nextNode.costToReach}`);
        // construct shortest path
        const path = [dest.id];
        let currentNode = nextNode;
        while (true) {
          let parentNode = currentNode.parent;
          path.unshift(parentNode.id);
          if (parentNode.costToReach === 0) {
            //means source node already
            break;
          }
          currentNode = parentNode;
        }
        console.log(path);
        break;
      } else {
        isVisited.push(nextNode.id);
      }

      // get neighbors from Redux store
      const nextNodeNeighbors = readOnlyState[nextNode.id];
      for (let i = 0; i < nextNodeNeighbors.length; i++) {
        let curr;
        const neighborId = nextNodeNeighbors[i].other;

        // find the actual Node object in nodesMap
        for (let j = 0; j < nodesMap.length; j++) {
          if (nodesMap[j].id === neighborId) {
            curr = nodesMap[j];
            break;
          }
        }

        //relaxx
        if (isVisited.includes(curr.id)) {
          continue;
        } else {
          const tempCostToReach =
            nextNodeNeighbors[i].weight + nextNode.costToReach;
          if (tempCostToReach < curr.costToReach) {
            curr.costToReach = tempCostToReach;
            curr.parent = nextNode;
          }
        }
      }
    }

    console.log('finish dijkstra');
  };

  const menuData = [
    {
      value: 'reset',
      onClick: e =>
        onClickReset(
          setNodes,
          setEdges,
          setCurrState,
          setLatestNodeId,
          setStartEndNodePair,
          setInfoText,
          dispatch,
        ),
      text: 'Reset',
      type: 'redo',
    },
    {
      value: 'addNode',
      onClick: e => onClickAddNodeButton(setCurrState, setInfoText),
      text: 'Add Node',
      type: 'plus-circle',
    },
    {
      value: 'delNode',
      onClick: e => onClickDelNodeButton(setCurrState, setInfoText),
      text: 'Delete Node',
      type: 'minus-circle',
    },

    {
      value: 'addEdge',
      onClick: e => onClickAddEdgeButton(setCurrState, setInfoText),
      text: 'Add Edge',
      type: 'plus',
    },

    {
      value: 'delEdge',
      onClick: e => onClickDelEdgeButton(setCurrState, setInfoText),
      text: 'Delete Edge',
      type: 'minus',
    },

    {
      value: 'run',
      onClick: e => onClickRunButton(setCurrState, setStartEndNodePair),
      text: 'Run Dijkstra!',
      type: 'play-circle',
    },
  ];

  return (
    <div>
      <MenuBar
        data={menuData}
        printStatus={() => printStatus(currState, startEndNodePair, dijkstra)}
      />
      <Alert showIcon message={infoText} type="info" />
      <div
        onClick={e => {
          if (currState.element === NODE && currState.operation === ADD) {
            handleAddNode(
              e,
              nodes,
              latestNodeId,
              setLatestNodeId,
              setNodes,
              dispatch,
            );
          }
        }}
        style={{
          borderColor: 'red',
          borderStyle: 'solid',
          height: '500px',
          width: '100%',
          textAlign: 'center',
        }}>
        {nodes.length > 0 ? (
          nodes.map(node => (
            <GraphNode
              onClick={e => {
                if (currState.element === NODE && currState.operation === DEL) {
                  return onClickDelNode(nodes, setNodes, node, dispatch);
                } else if (currState.element === EDGE) {
                  return onClickSelectNode(
                    node,
                    currState,
                    setCurrState,
                    edges,
                    setEdges,
                    dispatch,
                  );
                } else if (currState.operation === RUN) {
                  verifyStartEndNodes(node);
                }
              }}
              index={node.id}
              selected={currState.nodeA === node}
              x={node.x}
              y={node.y}
            />
          ))
        ) : (
          <div />
        )}
        {edges.length > 0 ? (
          edges.map(edge => {
            const data = {
              x1: edge.nodeA.x,
              y1: edge.nodeA.y,
              x2: edge.nodeB.x,
              y2: edge.nodeB.y,
            };
            return <Line data={data} />;
          })
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default Dijkstra;
