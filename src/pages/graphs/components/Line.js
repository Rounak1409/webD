import React from 'react';
import './animation.css';

function Line(props) {
  const {x1, x2, y1, y2} = props.data;
  let className;
  if (props.isShortest) {
    className = 'path';
  } else {
    className = '';
  }
  return (
    <svg
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
      }}>
      <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        className={className}
        style={
          props.isShortest
            ? {
                strokeWidth: '5px',
                stroke: 'green',
                animationDelay: `${props.wait}s`,
              }
            : {
                strokeWidth: '2px',
                stroke: 'black',
              }
        }
      />
    </svg>
  );
}

export default Line;
