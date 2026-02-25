import assert from "assert";
import GraphemeSplitter from "grapheme-splitter";

/**
 * Calculates the length of a given string
 * without using the built-in length property.
 *
 * @param str - Input string
 * @returns Number of characters in the string
 */
const splitter = new GraphemeSplitter();

function lengthOfString(str: string): number {
  return splitter.countGraphemes(str);
}

// Test cases
assert.strictEqual(lengthOfString(""), 0, "Should return 0 for empty string");

assert.strictEqual(
  lengthOfString("a"),
  1,
  "Should return 1 for single character",
);

assert.strictEqual(
  lengthOfString("hello"),
  5,
  "Should return correct length for normal word",
);

assert.strictEqual(
  lengthOfString("12345"),
  5,
  "Should correctly count numeric characters",
);

assert.strictEqual(
  lengthOfString("🙂"),
  1,
  "Should correctly count emoji as one character",
);

assert.strictEqual(
  lengthOfString("🇮🇳"),
  1,
  "Should count flag emoji correctly",
);

assert.strictEqual(
  lengthOfString("👍🏽"),
  1,
  "Should count emoji with skin tone correctly",
);
