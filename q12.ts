import assert from "assert";

/**
 * Returns true if at least one item in the array
 * satisfies the given predicate function.
 *
 * @param {any[]} items - The input array.
 * @param {(item: any) => boolean} predicate - Function that tests each item.
 * @returns {boolean} True if any item passes the predicate, otherwise false.
 */

//Imperative Solution (Using for loop)
function some(items: any[], predicate: (item: any) => boolean): boolean {
  for (let i = 0; i < items.length; i++) {
    if (predicate(items[i])) {
      return true;
    }
  }
  return false;
}

assert.strictEqual(
  some([1, 2, 3], (n) => n > 2),
  true,
);
assert.strictEqual(
  some([1, 2, 3], (n) => n > 5),
  false,
);
assert.strictEqual(
  some([], (n) => n > 0),
  false,
);

//Functional Solution (Using reduce)
function someReduce(items: any[], predicate: (item: any) => boolean): boolean {
  return items.reduce((acc, item) => {
    return acc || predicate(item);
  }, false);
}

assert.strictEqual(
  someReduce([1, 2, 3], (n) => n > 2),
  true,
);
assert.strictEqual(
  someReduce([1, 2, 3], (n) => n > 5),
  false,
);
assert.strictEqual(
  someReduce([], (n) => n > 0),
  false,
);
