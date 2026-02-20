import assert from "assert";

function boundedHearts(n: number): string[] {
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

assert.deepStrictEqual(boundedHearts(7), [
    "💚",
    "💚 💚",
    "💚 💙 💚",
    "💚 💙 💙 💚",
    "💚 💙 💙 💙 💚",
    "💚 💙 💙 💙 💙 💚",
    "💚 💚 💚 💚 💚 💚 💚",
]);

