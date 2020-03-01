const binarySearch = async (num, range, setRange, helperDelay) => {
  console.log(range);
  let low = 1;
  let high = range.length;
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

export default binarySearch;
