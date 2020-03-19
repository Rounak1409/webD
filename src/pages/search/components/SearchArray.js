import React, {useState} from 'react';
import {Slider, Button, InputNumber} from 'antd';
import BarSearch from './BarSearch';
import BinSearchDescription from '../components/BinSearchDescription';
import Legend from '../components/Legend';
import './SearchArray.css';

function SearchArray(props) {
  // 0% - (100% - WIDTH%) width to divide bars
  // default width of 1 bar is 1.5%
  // height 0 - 65%

  const [searchVal, setSearchVal] = useState(5);
  const initialRange = [];
  for (let i = 0; i < 10; i++) {
    initialRange.push({
      val: i + 1,
      isMid: false,
      isOutOfRange: false,
    });
  }
  const [range, setRange] = useState(initialRange);
  const helperDelay = ms => new Promise(res => setTimeout(res, ms));

  const reset = () => {
    setSearchVal(5);
    setRange(initialRange);
  };

  const renderBar = bar => {
    const numTotalBars = range.length;

    let width;
    if (numTotalBars <= 20) {
      width = 1.5;
    } else if (numTotalBars <= 40) {
      width = 1.25;
    } else if (numTotalBars <= 60) {
      width = 1;
    } else if (numTotalBars <= 80) {
      width = 0.75;
    } else {
      width = 0.5;
    }

    const tolWidth = 100 - width;
    const leftInterval = tolWidth / (numTotalBars - 1);
    const heightInterval = 100 / numTotalBars;

    const left = (bar.val - 1) * leftInterval;
    const height = bar.val * heightInterval;

    return (
      <BarSearch
        outOfRange={bar.isOutOfRange}
        mid={bar.isMid}
        left={left}
        height={height}
        width={width}
      />
    );
  };

  const binarySearch = async num => {
    console.log(range);
    let low = 1;
    let high = range.length;
    while (low <= high) {
      console.log(`low: ${low} high: ${high}`);
      let mid = Math.floor((low + high) / 2);
      const temp = [];
      for (let i = 0; i < range.length; i++) {
        if (i + 1 === mid) {
          temp.push({
            val: i + 1,
            isMid: true,
            isOutOfRange: false,
          });
        } else if (i + 1 < low || i + 1 > high) {
          temp.push({
            val: i + 1,
            isMid: false,
            isOutOfRange: true,
          });
        } else {
          temp.push({
            val: i + 1,
            isMid: false,
            isOutOfRange: false,
          });
        }
      }
      setRange(temp);
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
      await helperDelay(1500);
    }
  };

  return (
    <div style={{textAlign: 'center', height: '100%'}}>
      <h2>
        Adjust total number of bars:
        <Slider
          onChange={e => {
            let temp = [];
            for (let i = 0; i < e; i++) {
              temp.push({
                val: i + 1,
                isMid: false,
                isOutOfRange: false,
              });
            }
            setRange(temp);
          }}
          value={range.length}
          min={2}
          max={100}
        />
        Search Number from 1 to {range.length}:{' '}
        <InputNumber
          onChange={e => setSearchVal(e)}
          size="large"
          min={1}
          max={range.length}
          value={searchVal}
        />
      </h2>
      <Button
        onClick={e => binarySearch(searchVal)}
        type="primary"
        icon="search"
        style={{marginBottom: '1em', marginRight: '1em'}}>
        Search!
      </Button>
      <Button type="primary" icon="redo" onClick={e => reset()}>
        Reset
      </Button>
      <div className="SearchArray">{range.map(bar => renderBar(bar))}</div>
      <br />
      <BinSearchDescription />
      <br />
      <Legend />
    </div>
  );
}

export default SearchArray;
