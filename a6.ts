import assert from "assert";

/**
 * Pads zeros before a number to ensure it reaches a specified digit length.
 * If the number already has equal or more digits, it is returned as a string.
 *
 * @param num - The number to pad
 * @param numOfDigits - Desired total number of digits
 * @returns Zero-padded number as string
 * @throws Error if numOfDigits is negative
 */
function padZerosBeforeNumber(num: number, numOfDigits: number): string {
    if (numOfDigits < 0) {
        throw new Error("Number of digits cannot be negative");
    }

    const numStr = num.toString();
    const strlen = numStr.length;

    if (strlen >= numOfDigits) {
        return numStr;
    }

    return "0".repeat(numOfDigits - strlen) + numStr;
}

assert.strictEqual(
    padZerosBeforeNumber(233, 6),
    "000233",
    "should pad zeros to make total length 6"
);

assert.strictEqual(
    padZerosBeforeNumber(333333445, 4),
    "333333445",
    "should return number as string if already longer than required length"
);

assert.strictEqual(
    padZerosBeforeNumber(5, 1),
    "5",
    "should return same number when length equals required digits"
);

assert.strictEqual(
    padZerosBeforeNumber(5, 0),
    "5",
    "should return number when required digits is 0"
);

assert.throws(
    () => padZerosBeforeNumber(123, -2),
    "should throw error when numOfDigits is negative"
);