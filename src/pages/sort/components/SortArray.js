import React, {useState} from 'react';
import {Button, InputNumber} from 'antd';
import Bar from './Bar';
import './SortArray.css';
import knuthShuffle from '../helpers/knuthShuffle';

function SortArray(props) {
  // 0% - (100% - WIDTH%) width to divide bars
  // default width of 1 bar is 1.5%
  // height 0 - 65%

  const initialRange = [];
  for (let i = 0; i < 10; i++) {
    initialRange.push({
      val: i + 1,
      isMid: false,
      isOutOfRange: false,
    });
  }
  knuthShuffle(initialRange);
  const [range, setRange] = useState(initialRange);
  const [numMaxBars, setNumMaxBars] = useState(10);
  const [inProgress, setInProgress] = useState(false); // for disabling buttons after clicking (eg while shuffling is being done)
  const helperDelay = ms => new Promise(res => setTimeout(res, ms));

  const reset = () => {
    setNumMaxBars(10);
    knuthShuffle(initialRange);
    setRange(initialRange);
  };

  const randomize = async () => {
    const newRange = [];
    for (let i = 0; i < range.length; i++) {
      newRange.push(range[i]);
    }
    knuthShuffle(newRange);
    setRange(newRange);
    helperDelay(1000);
  };

  const renderBar = (bar, index) => {
    console.log(bar);
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

    const left = index * leftInterval;
    const height = bar.val * heightInterval;

    return (
      <Bar
        outOfRange={bar.isOutOfRange}
        mid={bar.isMid}
        left={left}
        height={height}
        width={width}
      />
    );
  };

  return (
    <div style={{textAlign: 'center', height: '100%'}}>
      <h2>
        Input total number of bars from 2 to 100:
        <InputNumber
          onChange={e => setNumMaxBars(e)}
          size="large"
          min={1}
          max={100}
          value={numMaxBars}
        />
        <Button
          onClick={e => {
            let temp = [];
            for (let i = 0; i < numMaxBars; i++) {
              temp.push({
                val: i + 1,
                isMid: false,
                isOutOfRange: false,
              });
            }
            knuthShuffle(temp);
            setRange(temp);
          }}>
          Submit
        </Button>
        <br />
        Sort Number from 1 to {range.length}!
      </h2>
      <Button
        onClick={e => e}
        type="primary"
        icon="play-circle"
        style={{marginBottom: '1em', marginRight: '1em'}}>
        Sort!
      </Button>
      <Button
        type="primary"
        icon="redo"
        onClick={e => randomize()}
        style={{marginRight: '1em'}}>
        Randomize
      </Button>
      <Button type="primary" icon="redo" onClick={e => reset()}>
        Reset
      </Button>
      <div className="SortArray">
        {range.map((bar, index) => renderBar(bar, index))}
      </div>
    </div>
  );
}

export default SortArray;
