import React, {useState} from 'react';
import GraphNode from './components/GraphNode';
import Line from './components/Line';
import MenuBar from './components/MenuBar';
import {Alert, message, Button} from 'antd';
import DijkstraDescription from './components/DijkstraDescription';
import Legend from './components/Legend';
import {useSelector, useDispatch} from 'react-redux';
import {NODE, EDGE, ADD, DEL, RUN, ADDNODEINFO} from './helpers/constants';
import {
  onClickReset,
  onClickAddNodeButton,
  onClickDelNodeButton,
  onClickDelNode,
  onClickAddEdgeButton,
  onClickDelEdgeButton,
  onClickRunButton,
  onClickSelectNode,
  handleAddNode,
} from './helpers/clickHandlers';
import dijkstra from './helpers/dijkstra';
import './GraphsPage.css';

function GraphsPage(props) {
  const [nodes, setNodes] = useState([]); // array of nodes
  const [edges, setEdges] = useState([]); // array of edges
  const [currState, setCurrState] = useState({
    element: NODE,
    operation: ADD,
    nodeA: null, // to "highlight" first node when drawing edges
  });
  const [startEndNodePair, setStartEndNodePair] = useState([null, null]); // source and destination vertex
  const [currentNode, setCurrentNode] = useState(null); //for dijkstra to indicate the node taken out from prio queue
  const [neighborNode, setNeighborNode] = useState(null); // for dijkstra to "highlight" neighbor nodes of the currentNode
  const [shortestPath, setShortestPath] = useState([]); // array of edges in the shortest path from src to dest
  const [latestNodeId, setLatestNodeId] = useState(0); // keep track of node IDs
  const [infoText, setInfoText] = useState(ADDNODEINFO); // the info text below menu bar
  const dispatch = useDispatch(); // connect to redux store, update it whenever add/delete node/edge
  const readOnlyState = useSelector(state => state.graph); // read the state of the graph from redux store

  const verifyStartEndNodes = node => {
    // verify that both src and dest are selected before we run the shortest path algo
    if (startEndNodePair[0] === null) {
      setStartEndNodePair([node, startEndNodePair[1]]);
    } else if (startEndNodePair[1] === null) {
      setStartEndNodePair([startEndNodePair[0], node]);
    } else {
      message.error('Already selected both start and end Nodes!');
    }
  };

  const helperDelay = ms => new Promise(res => setTimeout(res, ms)); // hackish delay function to show the visualization

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
        onClickRunButton(
          setCurrState,
          setStartEndNodePair,
          setInfoText,
          setShortestPath,
          setCurrentNode,
          setNeighborNode,
        ),
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
            onClick={e =>
              dijkstra(
                nodes,
                startEndNodePair,
                setShortestPath,
                setCurrentNode,
                setNeighborNode,
                readOnlyState,
                helperDelay,
              )
            }>
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
      <div style={{textAlign: 'center'}}>
        <DijkstraDescription />
        <Legend />
      </div>
    </div>
  );
}

export default GraphsPage;
