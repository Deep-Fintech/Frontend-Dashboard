export const removeDuplicatesFromArray = (arr) =>
  [...new Set(arr.map((el) => JSON.stringify(el)))].map((e) => JSON.parse(e));
// Remove duplicated values from a JSON array

export const keyExists = (arr, key) => {
  var newArr = arr.filter((e) => e.time == key).length;
  return newArr;
};

export const calcProfit = (prevProfit, pred1, pred2, real1, real2, tradeCount) => {
  var profit = prevProfit;
  var tradeCount = tradeCount; 
  if (pred2 > pred1) {
    console.log(
      "PROFIT : prevProfit, pred1, pred2, real1, real2",
      prevProfit,
      pred1,
      pred2,
      real1,
      real2
    );
    profit = prevProfit + (100 * real2) / real1 - 100;
    tradeCount = tradeCount + 1
    console.log("DEBUG ==> Calc Profit : ", profit);
  } else {
    console.log(
      "NO PPROFIT : prevProfit, pred1, pred2, real1, real2",
      prevProfit,
      pred1,
      pred2,
      real1,
      real2
    );
  }
  return [profit.toFixed(4), tradeCount];
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
