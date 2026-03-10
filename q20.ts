import assert from "assert";

/**
 * Applies a transformation function to each element of an array using reduce.
 * @param array input array
 * @param transform function to transform each element
 * @returns new array with transformed values
 */
const map = <T, U>(array: T[], transform: (item: T) => U): U[] => {
  return array.reduce((acc: U[], item) => {
    acc.push(transform(item));
    return acc;
  }, []);
};

/**
 * Filters elements of an array based on a condition using reduce.
 * @param array input array
 * @param predicate function that returns true if element should be kept
 * @returns new array containing filtered elements
 */
const filter = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.reduce((acc: T[], item) => {
    if (predicate(item)) acc.push(item);
    return acc;
  }, []);
};

const nums = [1, 2, 3, 4, 5];

const squared = map(nums, (n) => n * n);
assert.deepStrictEqual(squared, [1, 4, 9, 16, 25]);

const evens = filter(nums, (n) => n % 2 === 0);
assert.deepStrictEqual(evens, [2, 4]);
