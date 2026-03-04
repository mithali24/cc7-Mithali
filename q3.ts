import assert from "assert";

/**
 * 3. Filter all lines that do not contain '4'
 * from the purchase string.
 */
const purchase = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`;

const lines = purchase.split("\n");

const linesWithout4 = lines.filter((line) => !line.includes("4"));

const finalOutput = linesWithout4.join("\n");

assert.deepStrictEqual(linesWithout4, [
  "items qty",
  "mango 50",
  "onion 31",
  "water 10",
]);
