const quickSelect = async (num, range, setRange, helperDelay) => {
  console.log('start quick select');
  let rank = num - 1; // want to find rank (0-based indexing)
  let low = 0;
  let high = range.length - 1;

  const tempRange = [];
  for (let i = 0; i < range.length; i++) {
    tempRange.push(range[i]);
  }

  while (true) {
    if (low === high) {
      return tempRange[low];
    }

    let pIndex = randInt(low, high);

    // partition based on range[randIndex]
    const pIndexAfterPartition = partition(pIndex, tempRange, low, high);
    console.log(`pIndex is ${pIndex}, value is ${tempRange[pIndexAfterPartition]}, is ${pIndexAfterPartition}`);

    if (pIndexAfterPartition === rank) {
      console.log(tempRange[pIndexAfterPartition]);
      //return tempRange[pIndexAfterPartition];
    } else if (pIndexAfterPartition < rank) {
      high = pIndexAfterPartition - 1;
    } else {
      // pIndexAfterPartition > rank
      low = pIndexAfterPartition + 1;
      rank -= pIndexAfterPartition + 1;
    }
  }
};

// partitions array based on value at pIndex, returns index of partition value after partitioning
const partition = (pIndex, arr, low, high) => {
  // move val at pIndex to index low
  const pValue = arr[pIndex];
  let temp = arr[low];
  arr[low] = arr[pIndex];
  arr[pIndex] = temp;

  let currLow = low + 1;
  for (let i = low + 1; i <= high; i++) {
    if (arr[i] < pValue) {
      // swap value at index currLow with value at index i
      temp = arr[currLow];
      arr[currLow] = arr[i];
      arr[i] = temp;
      currLow++;
    }
  }

  temp = arr[currLow - 1];
  arr[currLow - 1] = arr[low];
  arr[low] = temp;
  return currLow - 1;
};

// returns a random integer from low(inclusive) -- high(inclusive)
const randInt = (low, high) => {
  const diff = high - low;
  return Math.floor(Math.random() * (diff + 1)) + low;
};

export default quickSelect;

/*
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
*/
