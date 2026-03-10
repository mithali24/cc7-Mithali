import assert from "assert";

/**
 * 7. Return Fibonacci numbers at given indices.
 */

const indices = [2, 1, 5, 7];

function fibonacci(n: number): number {
  if (n <= 1) return n;
  let a = 0,
    b = 1;

  for (let i = 2; i <= n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b;
}

const res = indices.map((i) => fibonacci(i));
console.log(res);

assert.deepStrictEqual(res, [1, 1, 5, 13]);
