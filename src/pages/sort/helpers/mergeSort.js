// implements bottom-up merge sort for easier visualization
const mergeSort = async (range, setRange, helperDelay) => {
  console.log('started');
  console.log(range);
  let sortedArr = [];
  for (let i = 0; i < range.length; i++) {
    sortedArr.push(range[i]);
  }

  let subSize = 1; // size of subsize arr for merge operation (i.e. [ sorted arr of size subSize ] [ sorted arr of size subSize ])
  let currIndex = 0; // keeps track of the current index
  while (subSize < range.length) {
    console.log(`subSize is ${subSize}`);

    const sortedTempArr = [];
    for (let i = 0; i < sortedArr.length; i++) {
      sortedTempArr.push(sortedArr[i]);
    }
    // iterate from start to end of arr for every (subSize * 2) array slice
    while (currIndex < range.length) {
      console.log(`currIndex is ${currIndex}`);
      const firstArr = [];
      const secondArr = [];
      let currPtr = currIndex;
      let firstPtr = 0;
      let secondPtr = 0;

      for (let i = 0; i < subSize; i++) {
        if (currIndex === range.length) {
          break;
        }
        firstArr.push(sortedTempArr[currIndex]);
        currIndex++;
      }

      for (let i = 0; i < subSize; i++) {
        if (currIndex === range.length) {
          break;
        }
        secondArr.push(sortedTempArr[currIndex]);
        currIndex++;
      }
      console.log('first', firstArr);
      console.log('second', secondArr);

      // merge firstArr and secondArr
      while (firstPtr < firstArr.length && secondPtr < secondArr.length) {
        const firstEle = firstArr[firstPtr];
        const secondEle = secondArr[secondPtr];

        if (firstEle.val > secondEle.val) {
          console.log(`position at ${currPtr} is ${secondEle.val}`);
          sortedTempArr[currPtr] = secondEle;
          secondPtr++;
        } else {
          console.log(`position at ${currPtr} is ${firstEle.val}`);
          sortedTempArr[currPtr] = firstEle;
          firstPtr++;
        }
        currPtr++;
      }

      while (firstPtr < firstArr.length) {
        sortedTempArr[currPtr] = firstArr[firstPtr];
        console.log(`position at ${currPtr} is ${firstArr[firstPtr].val}`);
        firstPtr++;
        currPtr++;
      }

      while (secondPtr < secondArr.length) {
        sortedTempArr[currPtr] = secondArr[secondPtr];
        console.log(`position at ${currPtr} is ${secondArr[secondPtr].val}`);
        secondPtr++;
        currPtr++;
      }
      setRange(sortedTempArr);
      await helperDelay(200);
      sortedArr = sortedTempArr;
    }
    subSize *= 2;
    currIndex = 0;
  }
  console.log(sortedArr);
};

export default mergeSort;
/*
  for (let i = 0; i < sortedArr.length; i++) {
    await helperDelay(50);

    for (let j = 0; j < sortedArr.length; j++) {
      const sortedTempArr = [];
      for (let k = 0; k < sortedArr.length; k++) {
        sortedTempArr.push(sortedArr[k]);
      }

      if (j === sortedArr.length - 1) {
        sortedTempArr[sortedArr.length - i - 1].isSorted = true;
        setRange(sortedTempArr);
        sortedArr = sortedTempArr;
        await helperDelay(50);
      } else if (sortedTempArr[j].val > sortedTempArr[j + 1].val) {
        const temp = sortedTempArr[j + 1];
        sortedTempArr[j + 1] = sortedTempArr[j];
        sortedTempArr[j] = temp;
        setRange(sortedTempArr);
        sortedArr = sortedTempArr;
        console.log('swap');
        await helperDelay(50);
      }
    }
  }

  console.log(sortedArr);
*/
