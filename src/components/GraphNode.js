import React from 'react';
import {ReactComponent as Circle} from './circle.svg';

function GraphNode(props) {
  const x = props.x - 27.5;
  const y = props.y - 27.5;
  return (
    <Circle
      key={props.index}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
      }}
    />
  );
}

export default GraphNode;
