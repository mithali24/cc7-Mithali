import assert from "assert";

/**
 * Finds the second largest unique number in an array.
 *
 * @param {number[]} arr - The input array of numbers.
 * @returns {number | null} The second largest number, or null
 * if it does not exist (array length < 2 or no unique second largest).
 */

//Imperative Approach
const findSecondLargest = (arr: number[]): number | null => {
  if (arr.length < 2) return null;

  let largest = -Infinity;
  let secondLargest = -Infinity;

  arr.forEach((num) => {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num !== largest) {
      secondLargest = num;
    }
  });

  return secondLargest === -Infinity ? null : secondLargest;
};

assert.strictEqual(findSecondLargest([10, 5, 8, 20, 15]), 15);
assert.strictEqual(findSecondLargest([1, 2]), 1);
assert.strictEqual(findSecondLargest([5]), null);
assert.strictEqual(findSecondLargest([7, 7, 7]), null);

//Functional Approach (Using reduce)
const findSecondLargestReduce = (arr: number[]): number | null => {
  if (arr.length < 2) return null;

  const result = arr.reduce(
    (acc, num) => {
      if (num > acc.largest) {
        acc.secondLargest = acc.largest;
        acc.largest = num;
      } else if (num > acc.secondLargest && num !== acc.largest) {
        acc.secondLargest = num;
      }
      return acc;
    },
    { largest: -Infinity, secondLargest: -Infinity },
  );

  return result.secondLargest === -Infinity ? null : result.secondLargest;
};

assert.strictEqual(findSecondLargestReduce([10, 5, 8, 20, 15]), 15);
assert.strictEqual(findSecondLargestReduce([1, 2]), 1);
assert.strictEqual(findSecondLargestReduce([5]), null);
assert.strictEqual(findSecondLargestReduce([7, 7, 7]), null);
