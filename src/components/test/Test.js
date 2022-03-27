// const removeDuplicatesFromArray = (arr, key) => {
//   var newArr = arr.filter((e) => e.time == key).length;
//   return newArr;
// };

// const arr = [
//   { time: 1, value: 11 },
//   { time: 2, value: 22 },
//   { time: 3, value: 33 },
//   { time: 1, value: 111 },
// ];

// var newArr = removeDuplicatesFromArray(arr, 1);
// console.log(newArr);

const func = () => {
  return [1, 2];
};

var [one, two] = func();

console.log(one);
console.log(two);
