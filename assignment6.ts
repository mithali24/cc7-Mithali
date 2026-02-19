import assert from "assert";

function padZerosBeforeNumber(num: number, numOfDigits: number): string {
    let res: string = '';
    let strlen: number = num.toString().length;
    if (strlen >= numOfDigits) {
        return num.toString();
    } else {
        res += '0'.repeat(numOfDigits - strlen);
        res += num.toString();
    }
    return res;
}

assert.strictEqual(padZerosBeforeNumber(233, 6), '000233', 'length');
assert.strictEqual(padZerosBeforeNumber(333333445, 4), '333333445', 'length');