export const addNums = ( a, b ) => {
  return a + b;
}

export const tilfeldigTallMellom = (min, maks) => {
  const d = maks + 1 - min;
  return min + Math.floor(d * Math.random());
}
