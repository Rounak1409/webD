import React, {useState} from 'react';
import {Button, InputNumber} from 'antd';
import Bar from './Bar';
import './SearchArray.css';

function SearchArray(props) {
  // 0 - 120em width to divide all the Bars
  // default width of 1 bar is 1.5em
  // height 0 - 50em;

  const [searchVal, setSearchVal] = useState(5);
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

  const binarySearch = num => {
    let low = 1;
    let high = numTotalBars;
    while (low <= high) {
      console.log(`low: ${low} high: ${high}`);
      let mid = Math.floor((low + high) / 2);
      if (mid === num) {
        console.log(`Found ${num}!`);
        break;
      } else if (mid > num) {
        // recurse on left
        high = mid - 1;
      } else {
        // mid < num
        // recurse on right
        low = mid + 1;
      }
    }
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h2>
        Search Number from 1 to {numTotalBars}:{' '}
        <InputNumber
          onChange={e => setSearchVal(e)}
          size="large"
          min={1}
          max={numTotalBars}
          defaultValue={searchVal}
        />
      </h2>
      <Button
        onClick={e => binarySearch(searchVal)}
        type="primary"
        icon="search">
        Search!
      </Button>
      <div className="SearchArray">{range.map(i => renderBar(i))}</div>
    </div>
  );
}

export default SearchArray;
