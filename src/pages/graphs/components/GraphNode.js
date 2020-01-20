import React from 'react';
import {ReactComponent as Circle} from './circle.svg';

function GraphNode(props) {
  const x = props.x - 27.5;
  const y = props.y - 27.5;
  /*
    borderStyle: 'solid',
    borderRadius: '50%',
    borderColor: 'yellow',
    */
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
      }}>
      <Circle key={props.index} />
      <h2>{props.index}</h2>
    </div>
  );
}

export default GraphNode;
