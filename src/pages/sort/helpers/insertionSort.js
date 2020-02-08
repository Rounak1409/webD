const insertionSort = async (range, setRange, helperDelay) => {
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
export default insertionSort;
