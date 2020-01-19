import React from 'react';

function GraphNode(props) {
  return (
    <h2 style={{position: 'absolute', left: `${props.x}px`, top: `${props.y}px`}}>
      This is a graph node!
    </h2>
  );
}

export default GraphNode;
