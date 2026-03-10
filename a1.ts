import assert from "assert";

/**
 * Generates a blue heart triangle pattern as a single string.
 * Each line contains increasing number of blue hearts (💙).
 *
 * @param lines - Number of lines to generate
 * @returns A newline-separated string of blue heart pattern
 * @throws Error if lines is negative
 */
function blueHeartPattern(lines: number): string {
  if (lines < 0) {
    throw new Error("Line count cannot be negative");
  }

  let pattern = "";

  for (let i = 1; i <= lines; i++) {
    pattern += "💙 ".repeat(i).trimEnd() + "\n";
  }

  return pattern.trimEnd();
}

const expected = `💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
💙 💙 💙 💙 💙`;

assert.strictEqual(
  blueHeartPattern(5),
  expected,
  "should generate correct 5-line blue heart pattern",
);

assert.strictEqual(
  blueHeartPattern(0),
  "",
  "should return empty string when lines is 0",
);

assert.throws(
  () => blueHeartPattern(-1),
  "should throw error when lines is negative",
);
