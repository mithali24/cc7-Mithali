import assert from "assert";

/**
 * Generate an array of first n natural numbers.
 * @param n number of natural numbers
 * @returns array of numbers
 */
const generateNumbers = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => i + 1);

/**
 * Separate numbers into odd and even arrays.
 * @param nums array of numbers
 * @returns object containing odd and even arrays
 */
const groupOddEven = (nums: number[]) => ({
  odd: nums.filter((n) => n % 2 !== 0),
  even: nums.filter((n) => n % 2 === 0),
});

/**
 * Convert odd/even arrays into their sums.
 * @param grouped object containing odd and even arrays
 * @returns object containing sums of odd and even numbers
 */
const sumOddEven = (grouped: { odd: number[]; even: number[] }) => ({
  odd: grouped.odd.reduce((a, b) => a + b, 0),
  even: grouped.even.reduce((a, b) => a + b, 0),
});

const numbers = generateNumbers(10);

assert.deepStrictEqual(numbers, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const grouped = groupOddEven(numbers);

assert.deepStrictEqual(grouped, {
  odd: [1, 3, 5, 7, 9],
  even: [2, 4, 6, 8, 10],
});

const summed = sumOddEven(grouped);

assert.deepStrictEqual(summed, {
  odd: 25,
  even: 30,
});
