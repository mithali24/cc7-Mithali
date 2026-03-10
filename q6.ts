import assert from "assert";

/**
 * 6. Add 10 to each number in the array,
 * then filter out those divisible by 4.
 */
const numbers = [34, 45, 2, 53, 84, 542, 31, 23];
const result = numbers.map((num) => num + 10).filter((num) => num % 4 === 0);

console.log(result);
assert.deepStrictEqual(result, [44, 12, 552]);
