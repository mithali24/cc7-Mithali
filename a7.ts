import assert from "assert";

function convertToBinary(numInDecimal: number) {
    let res = '';
    let num = numInDecimal;
    while (num > 0) {
        const rem = num % 2;
        res = rem + res;
        num = Math.floor(num / 2);
    }
    return res;
}

assert.strictEqual(convertToBinary(10), '1010');
assert.strictEqual(convertToBinary(1000), '1111101000');
