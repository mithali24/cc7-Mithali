import assert from "assert";

/**
 * Returns a substring containing characters from the input string
 * until a repeating character is encountered.
 *
 * @param str - Input string
 * @returns Substring up to (but not including) the first repeating character
 */
function getStringSpecial(str: string): string {
    let res = "";

    for (const ch of str) {
        if (res.indexOf(ch) !== -1) {
            break;
        }
        res += ch;
    }

    return res;
}

assert.strictEqual(
    getStringSpecial("a dream that is"),
    "a dre",
    "should stop when first repeating character is encountered"
);

assert.strictEqual(
    getStringSpecial("unparliamentary"),
    "unparli",
    "should return substring until first repeated character"
);

assert.strictEqual(
    getStringSpecial("abc"),
    "abc",
    "should return entire string if no characters repeat"
);

assert.strictEqual(
    getStringSpecial(""),
    "",
    "should return empty string when input is empty"
);