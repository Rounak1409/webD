import React, {useState} from 'react';
import GraphNode from '../../components/GraphNode';
import Line from '../../components/Line';
import {Button} from 'antd';

function Dijkstra(props) {
  const [nodes, setNodes] = useState([]);

  const onClickSet = e => {
    if (e.target.value === 'reset') {
      return;
    }

    // IMMUTABILITY
    const temp = [];
    for (let i = 0; i < nodes.length; i++) {
      temp.push(nodes[i]);
    }

    const newNode = {
      x: e.clientX,
      y: e.clientY,
    };

    console.log(newNode);
    temp.push(newNode);
    setNodes(temp);
  };

  const onClickReset = e => {
    setNodes([]);
  };

  return (
    <div
      onClick={onClickSet}
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

      {nodes.length > 0 ? (
        nodes.map((node, index) => (
          <GraphNode index={index} x={node.x} y={node.y} />
        ))
      ) : (
        <div />
      )}
    </div>
  );
}

export default Dijkstra;
