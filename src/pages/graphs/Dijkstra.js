import React, {useState} from 'react';
import GraphNode from './components/GraphNode';
import Line from './components/Line';
import {Button} from 'antd';
import {useDispatch} from 'react-redux';
import {NODE, EDGE, ADD, DEL} from './helpers/constants';
import {
  onClickReset,
  onClickAddNodeButton,
  onClickDelNodeButton,
  onClickDelNode,
  onClickAddEdgeButton,
  onClickDelEdgeButton,
  printEdgesSelected,
  onClickSelectNode,
  handleAddNode,
} from './helpers/clickHandlers';


function Dijkstra(props) {
  const [nodes, setNodes] = useState([]);
  const [latestNodeId, setLatestNodeId] = useState(0);
  const [edges, setEdges] = useState([]);
  const [currState, setCurrState] = useState({
    element: NODE,
    operation: ADD,
    nodeA: null,
  });
  const dispatch = useDispatch();

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
      <h1>
        Current State ELEMENT: {currState.element} OPERATION:{' '}
        {currState.operation}
      </h1>
      {printEdgesSelected(currState)}
      <Button
        type="primary"
        onClick={e => onClickReset(setNodes, setEdges, setCurrState, dispatch)}
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
            x1: edge[0].x,
            y1: edge[0].y,
            x2: edge[1].x,
            y2: edge[1].y,
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
