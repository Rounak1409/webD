import React, {useState} from 'react';
import GraphNode from './components/GraphNode';
import Line from './components/Line';
import {Button} from 'antd';
import {useDispatch} from 'react-redux';
import constants from './helpers/constants';
import handleClick from './helpers/clickHandlers';

const {NODE, EDGE, ADD, DEL} = constants;

function Dijkstra(props) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [currState, setCurrState] = useState({
    element: NODE,
    operation: ADD,
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

  const onClickAddNode = e => {
    setCurrState({
      element: NODE,
      operation: ADD,
    });
  };

  const onClickDelNode = e => {
    setCurrState({
      element: NODE,
      operation: DEL,
    });
  };

  return (
    <div
      onClick={e =>
        handleClick(e, currState, nodes, edges, setNodes, setEdges, dispatch)
      }
      style={{
        borderColor: 'red',
        borderStyle: 'solid',
        height: '500px',
        width: '100%',
        textAlign: 'center',
      }}>
      <Button type="primary" onClick={onClickReset} value="reset">
        Reset
      </Button>
      <Button type="primary" onClick={onClickAddNode} value="addNode">
        Add Node
      </Button>
      <Button type="primary" onClick={onClickDelNode} value="delNode">
        Del Node
      </Button>
      {nodes.length > 0 ? (
        nodes.map(node => <GraphNode index={node.id} x={node.x} y={node.y} />)
      ) : (
        <div />
      )}
    </div>
  );
}

export default Dijkstra;
