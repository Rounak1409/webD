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

    // iterate from start to end of arr for every consecutive (subSize * 2) array slice
    while (currIndex < sortedArr.length) {
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
        firstArr.push(sortedArr[currIndex]);
        currIndex++;
      }

      for (let i = 0; i < subSize; i++) {
        if (currIndex === range.length) {
          break;
        }
        secondArr.push(sortedArr[currIndex]);
        currIndex++;
      }

      const lowerIndex = currPtr;
      const highIndex = currIndex - 1;
      let temp = deepCopy(sortedArr);
      temp[lowerIndex].underConsideration = true;
      temp[highIndex].underConsideration = true;
      console.log(
        `lower bound is at ${currPtr}, higher bound is at ${currIndex - 1}`,
      );
      setRange(temp);
      await helperDelay(250);

      console.log('first', firstArr);
      console.log('second', secondArr);

      // merge firstArr and secondArr
      while (firstPtr < firstArr.length && secondPtr < secondArr.length) {
        const firstEle = firstArr[firstPtr];
        const secondEle = secondArr[secondPtr];

        if (firstEle.val > secondEle.val) {
          sortedArr[currPtr] = secondEle;
          //sortedArr[currPtr].isSorted = true;
          secondPtr++;
        } else {
          sortedArr[currPtr] = firstEle;
          //sortedArr[currPtr].isSorted = true;
          firstPtr++;
        }

        //setRange(sortedArr);
        //await helperDelay(200);
        currPtr++;
      }

      while (firstPtr < firstArr.length) {
        sortedArr[currPtr] = firstArr[firstPtr];
        //sortedTempArr[currPtr].isSorted = true;
        //setRange(sortedTempArr);
        //await helperDelay(200);
        firstPtr++;
        currPtr++;
      }

      while (secondPtr < secondArr.length) {
        sortedArr[currPtr] = secondArr[secondPtr];
        //sortedTempArr[currPtr].isSorted = true;
        //setRange(sortedTempArr);
        //await helperDelay(200);
        secondPtr++;
        currPtr++;
      }

      temp = deepCopy(sortedArr);
      temp[lowerIndex].underConsideration = false;
      temp[highIndex].underConsideration = false;

      setRange(temp);
      await helperDelay(250);
    }

    subSize *= 2;
    currIndex = 0;
  }
  console.log(sortedArr);
};

export default mergeSort;

const deepCopy = arr => {
  const temp = [];
  for (let i = 0; i < arr.length; i++) {
    temp.push({
      val: arr[i].val,
    });
  }
  return temp;
};
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
