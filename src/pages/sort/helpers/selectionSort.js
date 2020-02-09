const selectionSort = async (range, setRange, helperDelay) => {
  let sortedArr = [];
  for (let i = 0; i < range.length; i++) {
    sortedArr.push(range[i]);
  }

  for (let i = 0; i < sortedArr.length; i++) {
    await helperDelay(50);

    let currMin = i;
    for (let j = i + 1; j < sortedArr.length + 1; j++) {
      const sortedTempArr = [];
      for (let k = 0; k < sortedArr.length; k++) {
        sortedTempArr.push(sortedArr[k]);
      }

      if (j === sortedArr.length) {
        // swap currMin with index i
        const temp = sortedArr[currMin];
        sortedTempArr[currMin] = sortedTempArr[i];
        sortedTempArr[i] = temp;
        sortedTempArr[i].isSorted = true;
        sortedArr = sortedTempArr;
        setRange(sortedTempArr);
        await helperDelay(50);
      } else if (sortedTempArr[j].val < sortedTempArr[currMin].val) {
        currMin = j;
        sortedArr = sortedTempArr;
        setRange(sortedTempArr);
        await helperDelay(50);
      }
    }
  }

  console.log(sortedArr);
};
export default selectionSort;
