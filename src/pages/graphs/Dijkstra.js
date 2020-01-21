import React, {useState} from 'react';
import GraphNode from './components/GraphNode';
import Line from './components/Line';
import {message, Button} from 'antd';
import {useDispatch} from 'react-redux';
import {NODE, EDGE, ADD, DEL, RUN} from './helpers/constants';
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
  const dispatch = useDispatch();

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
    console.log('dijkstra-ing...');
  };

  return (
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
      {printStatus(currState, startEndNodePair, dijkstra)}
      <Button
        type="primary"
        onClick={e =>
          onClickReset(
            setNodes,
            setEdges,
            setCurrState,
            setLatestNodeId,
            dispatch,
          )
        }
        value="reset">
        Reset
      </Button>
      <Button
        type="primary"
        onClick={e => onClickAddNodeButton(setCurrState)}
        value="addNode">
        Add Nodes
      </Button>
      <Button
        type="primary"
        onClick={e => onClickDelNodeButton(setCurrState)}
        value="delNode">
        Del Nodes
      </Button>
      <Button
        type="primary"
        onClick={e => onClickAddEdgeButton(setCurrState)}
        value="addEdge">
        Add Edges
      </Button>
      <Button
        type="primary"
        onClick={e => onClickDelEdgeButton(setCurrState)}
        value="delEdge">
        Del Edges
      </Button>
      <Button
        type="primary"
        onClick={e => onClickRunButton(setCurrState)}
        value="run">
        Run Dijkstra!
      </Button>
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
  );
}

export default Dijkstra;
