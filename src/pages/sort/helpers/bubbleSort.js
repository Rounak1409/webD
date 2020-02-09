const bubbleSort = async (range, setRange, helperDelay) => {
  let sortedArr = [];
  for (let i = 0; i < range.length; i++) {
    sortedArr.push(range[i]);
  }

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
};

export default bubbleSort;
