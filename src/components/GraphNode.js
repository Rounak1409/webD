import React from 'react';
import {ReactComponent as Circle} from './circle.svg';

function GraphNode(props) {
  return (
    <Circle
      key={props.index}
      style={{
        position: 'absolute',
        left: `${props.x}px`,
        top: `${props.y}px`,
      }}
    />
  );
}

export default GraphNode;
