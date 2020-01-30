import React from 'react';
import './Bar.css';

function Bar(props) {
  const left = `${props.left}em`;
  const height = `${props.height}em`;

  return (
    <div className="Bar" style={{left: left}}>
      <div className="BarColor" style={{height: height}} />
    </div>
  );
}

export default Bar;
