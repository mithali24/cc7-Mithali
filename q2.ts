import assert from "assert";

/**
 * 2. Transform the array such that
 * each occurrence of 'CraftCode' is replaced with 'CodeCraft'.
 */
const strings = [
  "CraftCode is a nice company",
  "We love CraftCode",
  "We are working in CraftCode",
  "Where is CraftCode?",
];

const transformed = strings.map((str) => str.replace("CraftCode", "CodeCraft"));

assert.deepStrictEqual(transformed, [
  "CodeCraft is a nice company",
  "We love CodeCraft",
  "We are working in CodeCraft",
  "Where is CodeCraft?",
]);
