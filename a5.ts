import assert from "assert";

/**
 * Generates the first n odd or even numbers.
 *
 * @param n - Number of elements to generate
 * @param evenOrOdd - Specifies whether to generate 'even' or 'odd' numbers
 * @returns Array of numbers based on the specified type
 * @throws Error if n is negative
 */
function printNumbers(n: number, evenOrOdd: "even" | "odd"): number[] {
    if (n < 0) {
        throw new Error("Count cannot be negative");
    }

    const result: number[] = [];
    let num = evenOrOdd === "even" ? 2 : 1;

    for (let i = 0; i < n; i++) {
        result.push(num);
        num += 2;
    }

    return result;
}

assert.deepStrictEqual(
    printNumbers(4, "odd"),
    [1, 3, 5, 7],
    "should generate first 4 odd numbers"
);

assert.deepStrictEqual(
    printNumbers(5, "even"),
    [2, 4, 6, 8, 10],
    "should generate first 5 even numbers"
);

assert.deepStrictEqual(
    printNumbers(0, "odd"),
    [],
    "should return empty array when n is 0"
);

assert.strictEqual(
    printNumbers(1, "even")[0],
    2,
    "should return 2 as first even number"
);

assert.throws(
    () => printNumbers(-1, "odd"),
    "should throw error when n is negative"
);