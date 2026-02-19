import assert from 'assert'

function getStringSpecial(str: string) {
    let res = '';
    for (let ch of str) {
        if (res.indexOf(ch) !== -1) {
            break;
        }
        res += ch;

    }
    return res;
}

assert.strictEqual(getStringSpecial('a dream that is'), 'a dre');
assert.strictEqual(getStringSpecial('unparliamentary'), 'unparli');