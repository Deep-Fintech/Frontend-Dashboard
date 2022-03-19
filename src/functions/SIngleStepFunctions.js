// Remove duplicated values from a JSON array
export const removeDuplicatesFromArray = (arr) =>
  [...new Set(arr.map((el) => JSON.stringify(el)))].map((e) => JSON.parse(e));

export const calcProfit = (prevProfit, pred1, pred2, real1, real2) => {
  var profit = 0;
  if (pred2 > pred1) {
    profit = prevProfit + (100 * real2) / real1 - 100;
  }
  return profit.toFixed(4);
};
