import React, {useState} from 'react';
import GraphNode from './components/GraphNode';
import Line from './components/Line';
import MenuBar from './components/MenuBar';
import {Alert, message, Button} from 'antd';
import DijkstraDescription from './components/DijkstraDescription';
import Legend from './components/Legend';
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
  RUNINFO,
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
import './Dijkstra.css';

function Dijkstra(props) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [currState, setCurrState] = useState({
    element: NODE,
    operation: ADD,
    nodeA: null,
  });
  const [startEndNodePair, setStartEndNodePair] = useState([null, null]);
  const [currentNode, setCurrentNode] = useState(null); //for dijkstra to indicate the node taken out from prio queue
  const [neighborNode, setNeighborNode] = useState(null);
  const [shortestPath, setShortestPath] = useState([]);
  const [latestNodeId, setLatestNodeId] = useState(0);
  const [infoText, setInfoText] = useState(ADDNODEINFO);
  const dispatch = useDispatch();
  const readOnlyState = useSelector(state => state.graph);

  const verifyStartEndNodes = node => {
    if (startEndNodePair[0] === null) {
      setStartEndNodePair([node, startEndNodePair[1]]);
    } else if (startEndNodePair[1] === null) {
      setStartEndNodePair([startEndNodePair[0], node]);
    } else {
      message.error('Already selected both start and end Nodes!');
    }
  };
  const helperDelay = ms => new Promise(res => setTimeout(res, ms));

  const dijkstra = async () => {
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
      await helperDelay(500);
      if (nextNode.id === dest.id) {
        console.log(`cost to reach is ${nextNode.costToReach}`);
        // construct shortest path
        let pair;
        const path = [];
        let currentNode = nextNode;
        while (true) {
          if (currentNode.parent === null) {
            //means source node already
            break;
          }
          let parentNode = currentNode.parent;
          pair = [parentNode, currentNode];
          path.push(pair);
          currentNode = parentNode;
        }
        console.log(path);
        setShortestPath(path);
        setCurrentNode(null);
        setNeighborNode(null);
        break;
      } else {
        isVisited.push(nextNode.id);
      }

      //mark nextNode as current node (styling purposes)
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === nextNode.id) {
          setCurrentNode(nodes[i]);
          setNeighborNode(null);
          break;
        }
      }

      // get neighbors from Redux store
      const nextNodeNeighbors = readOnlyState[nextNode.id];
      for (let i = 0; i < nextNodeNeighbors.length; i++) {
        await helperDelay(500);
        let curr;
        const neighborId = nextNodeNeighbors[i].other;

        // mark neighborNode
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].id === neighborId) {
            setNeighborNode(nodes[j]);
            break;
          }
        }

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
          setCurrentNode,
          setNeighborNode,
          setShortestPath,
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
      onClick: e =>
        onClickRunButton(setCurrState, setStartEndNodePair, setInfoText),
      text: 'Run',
      type: 'play-circle',
    },
  ];

  return (
    <div className="Custom-Parent">
      <MenuBar className="Custom-MenuBar" data={menuData} />
      <Alert showIcon message={infoText} type="info" className="Custom-Alert" />
      <div className="Custom-Block">
        <h1 className="Custom-Text">Draw Your Graph and Visualize Dijkstra!</h1>
        {currState.operation === RUN &&
        startEndNodePair[0] &&
        startEndNodePair[1] ? (
          <Button
            type="primary"
            icon="code"
            className="Custom-Button"
            onClick={dijkstra}>
            Run Dijkstra!
          </Button>
        ) : (
          <Button type="primary" icon="code" className="Custom-Button" disabled>
            Run Dijkstra!
          </Button>
        )}
      </div>
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
        className="Window">
        {nodes.length > 0 ? (
          nodes.map(node => (
            <GraphNode
              onClick={e => {
                if (currState.element === NODE && currState.operation === DEL) {
                  return onClickDelNode(
                    nodes,
                    setNodes,
                    node,
                    edges,
                    setEdges,
                    dispatch,
                  );
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
              selected={currState.nodeA === node || currentNode === node}
              isNeighbor={neighborNode === node}
              isStart={startEndNodePair[0] === node}
              isEnd={startEndNodePair[1] === node}
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
            return <Line isShortest={false} data={data} />;
          })
        ) : (
          <div />
        )}
        {shortestPath.map((pair, index) => {
          const parent = pair[0];
          const child = pair[1];
          const data = {
            x1: child.x,
            y1: child.y,
            x2: parent.x,
            y2: parent.y,
          };
          // edge is shortest path
          return <Line wait={index * 1.5} isShortest={true} data={data} />;
        })}
      </div>
      <br />
      <DijkstraDescription />
      <br />
      <Legend />
    </div>
  );
}

export default Dijkstra;
