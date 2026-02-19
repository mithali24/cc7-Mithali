import assert from "assert";

function lineParityHearts(n: number): string[] {
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


assert.deepStrictEqual(lineParityHearts(5), [
    "💚",
    "💙 💙",
    "💚 💚 💚",
    "💙 💙 💙 💙",
    "💚 💚 💚 💚 💚",
]);

