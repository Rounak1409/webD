import React from 'react';
import './BarSearch.css';

function BarSearch(props) {
  const left = `${props.left}%`;
  const height = `${props.height}%`;
  const width = `${props.width}%`;

  let className = 'BarColorSearch';
  if (props.mid) {
    className = className + ' mid';
  } else if (props.outOfRange) {
    className = className + ' outOfRange';
  }

  return (
    <div className="BarSearch" style={{left: left, width: width}}>
      <div className={className} style={{height: height}} />
    </div>
  );
}

export default BarSearch;
