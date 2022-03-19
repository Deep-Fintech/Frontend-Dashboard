// Remove duplicated values from a JSON array 
export const removeDuplicatesFromArray = (arr) =>
  [...new Set(arr.map((el) => JSON.stringify(el)))].map((e) => JSON.parse(e));
