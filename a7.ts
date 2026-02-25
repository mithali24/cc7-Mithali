import assert from "assert";

/**
 * Converts a decimal number to its binary representation.
 *
 * @param numInDecimal - Decimal number to convert
 * @returns Binary string representation
 * @throws Error if number is negative
 */
function convertToBinary(numInDecimal: number): string {
    if (numInDecimal < 0) {
        throw new Error("Negative numbers not allowed");
    }

    if (numInDecimal === 0) {
        return "0";
    }

    let res = "";
    let num = numInDecimal;

    while (num > 0) {
        const rem = num % 2;
        res = rem + res;
        num = Math.floor(num / 2);
    }

    return res;
}

assert.strictEqual(
    convertToBinary(10),
    "1010",
    "should correctly convert 10 to binary"
);

assert.strictEqual(
    convertToBinary(1000),
    "1111101000",
    "should correctly convert 1000 to binary"
);

assert.strictEqual(
    convertToBinary(0),
    "0",
    "should return '0' when input is 0"
);

assert.throws(
    () => convertToBinary(-5),
    "should throw error for negative numbers"
);