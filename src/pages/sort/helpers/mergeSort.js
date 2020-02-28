// implements bottom-up merge sort for easier visualization
const mergeSort = async (range, setRange, helperDelay) => {
  let sortedArr = [];
  for (let i = 0; i < range.length; i++) {
    sortedArr.push(range[i]);
  }

  let subSize = 1; // size of subsize arr for merge operation (i.e. [ sorted arr of size subSize ] [ sorted arr of size subSize ])
  let currIndex = 0; // keeps track of the current index
  while (subSize < range.length) {
    // iterate from start to end of arr for every consecutive (subSize * 2) array slice
    while (currIndex < sortedArr.length) {
      const firstArr = [];
      const secondArr = [];
      let currPtr = currIndex;
      let firstPtr = 0;
      let secondPtr = 0;

      for (let i = 0; i < subSize; i++) {
        if (currIndex === range.length) {
          break;
        }
        firstArr.push({
          val: sortedArr[currIndex].val,
          isSorted: sortedArr[currIndex].isSorted,
        });
        currIndex++;
      }

      for (let i = 0; i < subSize; i++) {
        if (currIndex === range.length) {
          break;
        }
        secondArr.push({
          val: sortedArr[currIndex].val,
          isSorted: sortedArr[currIndex].isSorted,
        });
        currIndex++;
      }

      const lowerIndex = currPtr;
      const highIndex = currIndex - 1;
      sortedArr[lowerIndex].underConsideration = true;
      sortedArr[highIndex].underConsideration = true;
      let temp = deepCopyValAndIsSorted(sortedArr);
      setRange(temp);
      await helperDelay(50);

      // merge firstArr and secondArr
      while (firstPtr < firstArr.length && secondPtr < secondArr.length) {
        const firstEle = firstArr[firstPtr];
        const secondEle = secondArr[secondPtr];

        if (firstEle.val > secondEle.val) {
          sortedArr[currPtr] = secondEle;
          secondPtr++;
        } else {
          sortedArr[currPtr] = firstEle;
          firstPtr++;
        }

        sortedArr[currPtr].isSorted = true;
        temp = deepCopyValAndIsSorted(sortedArr);
        setRange(temp);
        await helperDelay(50);
        currPtr++;
      }

      while (firstPtr < firstArr.length) {
        sortedArr[currPtr] = firstArr[firstPtr];
        sortedArr[currPtr].isSorted = true;
        temp = deepCopyValAndIsSorted(sortedArr);
        setRange(temp);
        await helperDelay(50);
        firstPtr++;
        currPtr++;
      }

      while (secondPtr < secondArr.length) {
        sortedArr[currPtr] = secondArr[secondPtr];
        sortedArr[currPtr].isSorted = true;
        temp = deepCopyValAndIsSorted(sortedArr);
        setRange(temp);
        await helperDelay(50);
        secondPtr++;
        currPtr++;
      }

      sortedArr[lowerIndex].underConsideration = false;
      sortedArr[highIndex].underConsideration = false;
      temp = deepCopyValAndIsSorted(sortedArr);

      setRange(temp);
      await helperDelay(50);
    }

    sortedArr = deepCopyOnlyVal(sortedArr);
    subSize *= 2;
    currIndex = 0;
  }

  console.log(sortedArr);
};

// utility function to deepcopy array containing SortBars
const deepCopyOnlyVal = arr => {
  const temp = [];
  for (let i = 0; i < arr.length; i++) {
    temp.push({
      val: arr[i].val,
    });
  }
  return temp;
};

const deepCopyValAndIsSorted = arr => {
  const temp = [];
  for (let i = 0; i < arr.length; i++) {
    temp.push({
      val: arr[i].val,
      isSorted: arr[i].isSorted,
      underConsideration: arr[i].underConsideration,
    });
  }
  return temp;
};

export default mergeSort;
