import React from 'react';
import './Bar.css';

function Bar(props) {
  const left = `${props.left}%`;
  const height = `${props.height}%`;
  const width = `${props.width}%`;

  let className = 'BarColor';
  if (props.isSorted) {
    className = className + ' sorted';
  } else if (props.isMin) {
    className = className + ' currMin';
  }

  return (
    <div className="Bar" style={{left: left, width: width}}>
      <div className={className} style={{height: height}} />
    </div>
  );
}

export default Bar;
