import React from 'react';
import './Bar.css';

function Bar(props) {
  const left = `${props.left}em`;
  const height = `${props.height}em`;
  const width = `${props.width}em`;

  let className = 'BarColor';
  if (props.mid) {
    className = className + ' mid';
  } else if (props.outOfRange) {
    className = className + ' outOfRange';
  }

  return (
    <div className="Bar" style={{left: left, width: width}}>
      <div className={className} style={{height: height}} />
    </div>
  );
}

export default Bar;
