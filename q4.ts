import assert from "assert";

/**
 * 4. Filter out all strings that contain either 'u' or 'g'.
 */
const items = ["browl", "faaast", "energy", "stand", "eat", "lunch"];
const filtered = items.filter(
  (str) => !str.includes("u") && !str.includes("g"),
);

assert.deepStrictEqual(filtered, ["browl", "faaast", "stand", "eat"]);
