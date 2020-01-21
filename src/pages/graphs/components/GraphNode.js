import React from 'react';
import {Button} from 'antd';
import CircleIcon from './CircleIcon';

function GraphNode(props) {
  const x = props.x - 50;
  const y = props.y - 50;
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
      }}
      key={props.index}
      onClick={props.onClick}>
      <div>{props.index}</div>
      <CircleIcon selected={props.selected} />
    </div>
  );
}

export default GraphNode;
