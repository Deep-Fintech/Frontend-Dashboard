// Remove duplicated values from a JSON array
export const removeDuplicatesFromArray = (arr) =>
  [...new Set(arr.map((el) => JSON.stringify(el)))].map((e) => JSON.parse(e));

export const calcProfit = (prevProfit, pred1, pred2, real1, real2) => {
  var profit = prevProfit;
  if (pred2 > pred1) {
    console.log(
      "prevProfit, pred1, pred2, real1, real2",
      prevProfit,
      pred1,
      pred2,
      real1,
      real2
    );
    profit = prevProfit + (100 * real2) / real1 - 100;
    console.log("DEBUG ==> Calc Profit : ", profit);
  }
  return profit.toFixed(4);
};

export const hasTime = (jsonArr, time) => {
  let a = false;
  jsonArr.forEach((element) => {
    if (element.time == time) {
      a = true;
    }
  });
  return a;
};
