import assert from "assert";
function printNumbers(n: number, evenOrOdd: "even" | "odd"): number[] {
    let result: number[] = [];
    let num = evenOrOdd === 'even' ? 2 : 1;
    for (let i = 0; i < n; i++) {
        result.push(num);
        num += 2;

    }
    return result;
}

console.log(printNumbers(4, 'even'));

assert.deepStrictEqual(
    printNumbers(4, "odd"),
    [1, 3, 5, 7]
);

assert.deepStrictEqual(
    printNumbers(5, "even"),
    [2, 4, 6, 8, 10]
);

assert.deepStrictEqual(
    printNumbers(0, "odd"),
    []
);

assert.deepStrictEqual(
    printNumbers(1, "even"),
    [2]
);