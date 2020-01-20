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
      <Button type="primary" onClick={onClickAddNodeButton} value="addNode">
        Add Node
      </Button>
      <Button type="primary" onClick={onClickDelNodeButton} value="delNode">
        Del Node
      </Button>
      {nodes.length > 0 ? (
        nodes.map(node => (
          <GraphNode
            onClick={e => onClickDelNode(e, node)}
            delete={currState.operation === DEL}
            index={node.id}
            x={node.x}
            y={node.y}
          />
        ))
      ) : (
        <div />
      )}
    </div>
  );
}

export default Dijkstra;
