import React, {useState} from 'react';
import GraphNode from './components/GraphNode';
import Line from './components/Line';
import {Button} from 'antd';
import {useDispatch} from 'react-redux';
import constants from './helpers/constants';
import handleClick from './helpers/clickHandlers';
import {addNode, delNode, addEdge, delEdge} from '../../redux/graphActions';

const {NODE, EDGE, ADD, DEL} = constants;

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

  const onClickReset = e => {
    setNodes([]);
    setEdges([]);
    setCurrState({
      element: NODE,
      operation: ADD,
    });
  };

  const onClickAddNodeButton = e => {
    setCurrState({
      element: NODE,
      operation: ADD,
    });
  };

  const onClickDelNodeButton = e => {
    setCurrState({
      element: NODE,
      operation: DEL,
    });
  };

  const onClickDelNode = (e, node) => {
    if (currState.operation === DEL) {
      const temp = [];
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] !== node) {
          temp.push(nodes[i]);
        }
      }
      setNodes(temp);
      dispatch(delNode(node));
    }
  };

  const onClickAddEdgeButton = e => {
    setCurrState({
      element: EDGE,
      operation: ADD,
      nodeA: null,
      nodeB: null,
    });
  };

  const onClickDelEdgeButton = e => {
    setCurrState({
      element: EDGE,
      operation: DEL,
      nodeA: null,
      nodeB: null,
    });
  };

  const printEdgesSelected = () => {
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

  const onClickSelectNode = node => {
    if (currState.nodeA) {
      //draw edge from nodeA to node
      const temp = [];
      for (let i = 0; i < edges.length; i++) {
        temp.push(edges[i]);
      }
      temp.push([currState.nodeA, node]);
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

  return (
    <div
      onClick={e =>
        handleClick(
          e,
          currState,
          nodes,
          latestNodeId,
          setLatestNodeId,
          edges,
          setNodes,
          setEdges,
          dispatch,
        )
      }
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
      {printEdgesSelected()}
      <Button type="primary" onClick={onClickReset} value="reset">
        Reset
      </Button>
      <Button type="primary" onClick={onClickAddNodeButton} value="addNode">
        Add Nodes
      </Button>
      <Button type="primary" onClick={onClickDelNodeButton} value="delNode">
        Del Nodes
      </Button>
      <Button type="primary" onClick={onClickAddEdgeButton} value="addEdge">
        Add Edges
      </Button>
      <Button type="primary" onClick={onClickDelEdgeButton} value="delEdge">
        Del Edges
      </Button>
      {nodes.length > 0 ? (
        nodes.map(node => (
          <GraphNode
            onClick={e => {
              if (currState.element === NODE && currState.operation === DEL) {
                return onClickDelNode(e, node);
              } else if (currState.element === EDGE) {
                return onClickSelectNode(node);
              }
            }}
            delete={currState.operation === DEL}
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
