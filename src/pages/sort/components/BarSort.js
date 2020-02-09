import React from 'react';
import './BarSort.css';

function BarSort(props) {
  const left = `${props.left}%`;
  const height = `${props.height}%`;
  const width = `${props.width}%`;

  let className = 'BarColorSort';
  if (props.isSorted) {
    className = className + ' sorted';
  } else if (props.isMin) {
    className = className + ' currMin';
  }

  return (
    <div className="BarSort" style={{left: left, width: width}}>
      <div className={className} style={{height: height}} />
    </div>
  );
}

export default BarSort;
