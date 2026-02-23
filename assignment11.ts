import assert from "assert";

/**
 * Generates an array containing the first n square numbers.
 *
 * @param n - Number of square numbers to generate
 * @returns Array of square numbers from 1² up to n²
 */
function generateFirstSquares(n: number): number[] {
  if (n <= 0) return [];

  const result: number[] = [];

  for (let i = 1; i <= n; i++) {
    result.push(i * i);
  }

  return result;
}

// Test cases
assert.deepStrictEqual(
  generateFirstSquares(4),
  [1, 4, 9, 16],
  "Should generate first 4 square numbers",
);

assert.deepStrictEqual(
  generateFirstSquares(1),
  [1],
  "Should return [1] when n is 1",
);

assert.deepStrictEqual(
  generateFirstSquares(0),
  [],
  "Should return empty array when n is 0",
);

assert.deepStrictEqual(
  generateFirstSquares(3),
  [1, 4, 9],
  "Should generate correct square sequence",
);

assert.deepStrictEqual(
  generateFirstSquares(-2),
  [],
  "Should return empty array for negative input",
);
