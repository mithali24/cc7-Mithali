import assert from "assert";

/**
 * Generates an array of strings where each line contains
 * alternating green (💚) and blue (💙) hearts.
 * The number of hearts increases with each line.
 *
 * @param n - Number of lines to generate
 * @returns Array of alternating heart pattern strings
 * @throws Error if n is negative
 */
function alternatingHearts(n: number): string[] {
    if (n < 0) {
        throw new Error("Line count cannot be negative");
    }

    const result: string[] = [];

    for (let i = 1; i <= n; i++) {
        let line = "";

        for (let j = 1; j <= i; j++) {
            line += (j % 2 === 1 ? "💚" : "💙") + " ";
        }

        result.push(line.trim());
    }

    return result;
}

assert.deepStrictEqual(
    alternatingHearts(6),
    [
        "💚",
        "💚 💙",
        "💚 💙 💚",
        "💚 💙 💚 💙",
        "💚 💙 💚 💙 💚",
        "💚 💙 💚 💙 💚 💙",
    ],
    "should generate correct alternating heart pattern for n = 6"
);

assert.deepStrictEqual(
    alternatingHearts(0),
    [],
    "should return empty array when n is 0"
);

assert.throws(
    () => alternatingHearts(-1),
    "should throw error when n is negative"
);