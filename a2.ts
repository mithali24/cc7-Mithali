import assert from "assert";

/**
 * Generates an array of heart strings where:
 * Odd line numbers contain green hearts (💚)
 * Even line numbers contain blue hearts (💙)
 * Each line contains hearts equal to its line number.
 *
 * @param n - Number of lines to generate
 * @returns Array of heart pattern strings
 * @throws Error if n is negative
 */
function lineParityHearts(n: number): string[] {
    if (n < 0) {
        throw new Error("Line count cannot be negative");
    }

    const result: string[] = [];

    for (let i = 1; i <= n; i++) {
        let line = "";

        for (let j = 1; j <= i; j++) {
            line += (i % 2 === 1 ? "💚" : "💙") + " ";
        }

        result.push(line.trim());
    }

    return result;
}

assert.deepStrictEqual(
    lineParityHearts(5),
    [
        "💚",
        "💙 💙",
        "💚 💚 💚",
        "💙 💙 💙 💙",
        "💚 💚 💚 💚 💚",
    ],
    "should generate correct alternating heart pattern for n = 5"
);

assert.deepStrictEqual(
    lineParityHearts(0),
    [],
    "should return empty array when n is 0"
);

assert.throws(
    () => lineParityHearts(-1),
    "should throw error when n is negative"
);