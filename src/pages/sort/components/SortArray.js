import React, {useState} from 'react';
import {Slider, Button} from 'antd';
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
      isSorted: false,
    });
  }
  knuthShuffle(initialRange);

  const [range, setRange] = useState(initialRange);
  const helperDelay = ms => new Promise(res => setTimeout(res, ms));

  const reset = () => {
    knuthShuffle(initialRange);
    setRange(initialRange);
  };

  const randomize = () => {
    const newRange = [];
    for (let i = 0; i < range.length; i++) {
      newRange.push(range[i]);
    }
    knuthShuffle(newRange);
    setRange(newRange);
  };

  const renderBar = (bar, index) => {
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
        isSorted={bar.isSorted}
        left={left}
        height={height}
        width={width}
      />
    );
  };

  const insertionSort = async () => {
    let sortedArr = [];
    for (let i = 0; i < range.length; i++) {
      if (i === 0) {
        sortedArr.push({
          val: range[i].val,
          isSorted: true,
        });
      } else {
        sortedArr.push(range[i]);
      }
    }

    for (let i = 1; i < sortedArr.length; i++) {
      await helperDelay(50);

      const key = sortedArr[i].val;
      for (let j = i - 1; j >= -1; j--) {
        const sortedTempArr = [];
        for (let k = 0; k < sortedArr.length; k++) {
          sortedTempArr.push(sortedArr[k]);
        }

        if (j === -1 || sortedTempArr[j].val <= key) {
          sortedTempArr[i].isSorted = true;
          sortedTempArr[j + 1].isSorted = true;
          setRange(sortedTempArr);
          sortedArr = sortedTempArr;
          await helperDelay(50);
          break;
        } else {
          const temp = sortedTempArr[j + 1];
          sortedTempArr[j + 1] = sortedTempArr[j];
          sortedTempArr[j] = temp;
          setRange(sortedTempArr);
          sortedArr = sortedTempArr;
          await helperDelay(50);
        }
      }
    }

    console.log(sortedArr);
  };

  return (
    <div style={{textAlign: 'center', height: '100%'}}>
      <h2>
        Select total number of bars from 2 to 100:
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
            knuthShuffle(temp);
            setRange(temp);
          }}
          value={range.length}
          min={2}
          max={100}
        />
        <br />
        Sort Number from 1 to {range.length}!
      </h2>
      <Button
        onClick={e => insertionSort()}
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
        {range.map((bar, index) => (bar ? renderBar(bar, index) : 0))}
      </div>
    </div>
  );
}

export default SortArray;
