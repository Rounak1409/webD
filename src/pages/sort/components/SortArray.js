import React, {useState} from 'react';
import {Slider, Button, Select} from 'antd';
import BarSort from './BarSort';
import './SortArray.css';
import knuthShuffle from '../helpers/knuthShuffle';
import insertionSort from '../helpers/insertionSort';
import bubbleSort from '../helpers/bubbleSort';
import selectionSort from '../helpers/selectionSort';

const {Option} = Select;

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
  const [sortingAlgo, setSortingAlgo] = useState('insertionSort'); //insertion sort by default
  const [sortingInProgress, setSortingInProgress] = useState(false); //to disable buttons when sorting is ongoing
  const helperDelay = ms => new Promise(res => setTimeout(res, ms));

  const reset = () => {
    setSortingAlgo('insertionSort');
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

  const handleSort = async () => {
    setSortingInProgress(true);
    switch (sortingAlgo) {
      case 'insertionSort':
        await insertionSort(range, setRange, helperDelay);
        break;
      case 'bubbleSort':
        await bubbleSort(range, setRange, helperDelay);
        break;
      case 'selectionSort':
        await selectionSort(range, setRange, helperDelay);
        break;
      default:
        return;
    }
    setSortingInProgress(false);
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
      <BarSort
        isMin={bar.isMin}
        isSorted={bar.isSorted}
        left={left}
        height={height}
        width={width}
      />
    );
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
        Sort Number from 1 to {range.length} using
        <Select
          style={{marginLeft: '1em', width: '9em'}}
          value={sortingAlgo}
          onChange={e => setSortingAlgo(e)}>
          <Option value="insertionSort">Insertion Sort</Option>
          <Option value="bubbleSort">Bubble Sort</Option>
          <Option value="selectionSort">Selection Sort</Option>
        </Select>
      </h2>
      <Button
        disabled={sortingInProgress}
        onClick={handleSort}
        type="primary"
        icon="play-circle"
        style={{marginBottom: '1em', marginRight: '1em'}}>
        Sort!
      </Button>
      <Button
        type="primary"
        disabled={sortingInProgress}
        icon="redo"
        onClick={e => randomize()}
        style={{marginRight: '1em'}}>
        Randomize
      </Button>
      <Button
        disabled={sortingInProgress}
        type="primary"
        icon="redo"
        onClick={e => reset()}>
        Reset
      </Button>
      <div className="SortArray">
        {range.map((bar, index) => (bar ? renderBar(bar, index) : 0))}
      </div>
    </div>
  );
}

export default SortArray;
