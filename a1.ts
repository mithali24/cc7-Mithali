import assert from 'assert';

function blueHeartPattern(lines: number): string {
    let pattern = '';
    for (let i = 1; i <= lines; i++) {
        pattern += '💙 '.repeat(i).trimEnd() + '\n';
    }
    return pattern.trimEnd();
}



let expected = `💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
💙 💙 💙 💙 💙`;

assert.strictEqual(blueHeartPattern(5), expected, '5 line count failed');