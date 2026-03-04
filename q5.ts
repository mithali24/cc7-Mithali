import assert from "assert";

/**
 * 5. Filter all elements that start with 'mang'
 * or end with 'fy'.
 */
let items = [
  "mangalore",
  "semangin",
  "2 lonely",
  "verify",
  "rectify",
  "mangala",
  "notifyy",
];

const result = items.filter(
  (item) => item.startsWith("mang") || item.endsWith("fy"),
);

assert.deepStrictEqual(result, ["mangalore", "verify", "rectify", "mangala"]);
