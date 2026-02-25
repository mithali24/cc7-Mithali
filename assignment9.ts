import assert from "assert";

/**
 * Adds corresponding elements of two number arrays.
 * If arrays have different lengths, missing values are treated as 0.
 *
 * @param a - First number array
 * @param b - Second number array
 * @returns A new array containing the sum of corresponding elements
 */
function addArrays(a: number[], b: number[]): number[] {
  const result: number[] = [];
  const maxLength = Math.max(a.length, b.length);

  for (let i = 0; i < maxLength; i++) {
    result[i] = (a[i] ?? 0) + (b[i] ?? 0);
  }

  return result;
}

// Test cases
assert.deepStrictEqual(
  addArrays([2, 3, 5], [5, 6, 4]),
  [7, 9, 9],
  "Should add corresponding elements of equal-length arrays",
);

assert.deepStrictEqual(
  addArrays([2, 2], [4, 5, 6]),
  [6, 7, 6],
  "Should treat missing elements in shorter array as 0",
);

assert.deepStrictEqual(
  addArrays([4, 5, 5], []),
  [4, 5, 5],
  "Should return first array when second array is empty",
);

assert.deepStrictEqual(
  addArrays([], [1, 2]),
  [1, 2],
  "Should return second array when first array is empty",
);

assert.deepStrictEqual(
  addArrays([], []),
  [],
  "Should return empty array when both arrays are empty",
);
