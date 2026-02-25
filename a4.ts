import assert from "assert";

/**
 * Generates a bounded heart triangle pattern.
 * - First and last hearts in each row are green (💚)
 * - The entire last row is green (💚)
 * - Inner hearts are blue (💙)
 *
 * @param n - Number of lines to generate
 * @returns Array of bounded heart pattern strings
 * @throws Error if n is negative
 */
function boundedHearts(n: number): string[] {
    if (n < 0) {
        throw new Error("Line count cannot be negative");
    }

    const result: string[] = [];

    for (let i = 1; i <= n; i++) {
        let line = "";

        for (let j = 1; j <= i; j++) {
            if (j === 1 || j === i || i === n) {
                line += "💚 ";
            } else {
                line += "💙 ";
            }
        }

        result.push(line.trim());
    }

    return result;
}

assert.deepStrictEqual(
    boundedHearts(7),
    [
        "💚",
        "💚 💚",
        "💚 💙 💚",
        "💚 💙 💙 💚",
        "💚 💙 💙 💙 💚",
        "💚 💙 💙 💙 💙 💚",
        "💚 💚 💚 💚 💚 💚 💚",
    ],
    "should generate correct bounded heart pattern for n = 7"
);

assert.deepStrictEqual(
    boundedHearts(0),
    [],
    "should return empty array when n is 0"
);

assert.throws(
    () => boundedHearts(-1),
    "should throw error when n is negative"
);