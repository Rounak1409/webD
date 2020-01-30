import React from 'react';
import {Button, InputNumber} from 'antd';
import Bar from './Bar';
import './SearchArray.css';

function SearchArray(props) {
  // 0 - 120em width to divide all the Bars
  // default width of 1 bar is 1.5em
  // height 0 - 50em;

  const numTotalBars = props.numTotalBars;
  const leftInterval = 120 / (numTotalBars - 1);
  const heightInterval = 50 / numTotalBars;

  const renderBar = val => {
    let left;
    if (val === 1) {
      left = 0;
    } else {
      left = (val - 1) * leftInterval - 1.5;
    }
    const height = val * heightInterval;
    return <Bar left={left} height={height} />;
  };

  const range = [];
  for (let i = 0; i < numTotalBars; i++) {
    range.push(i + 1);
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h2>
        Search Number from 2 to 75:{' '}
        <InputNumber size="large" min={2} max={75} defaultValue={38} />
      </h2>
      <Button type="primary" icon='search' >Search!</Button>
      <div className="SearchArray">{range.map(i => renderBar(i))}</div>
    </div>
  );
}

export default SearchArray;
