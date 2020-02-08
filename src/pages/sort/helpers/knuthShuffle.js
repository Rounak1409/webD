// generate random permutation of the barArr
const knuthShuffle = barArr => {
  for (let i = 1; i < barArr.length; i++) {
    // range: 0 ... i (inclusive)
    const range = i + 1;
    const r = Math.floor(Math.random() * range);
    // swap barArr[i] and barArr[r]
    const temp = barArr[i];
    barArr[i] = barArr[r];
    barArr[r] = temp;
  }
};

export default knuthShuffle;
