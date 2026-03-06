import assert from "assert";

/**
 * Generate array of alphabets from a-z.
 * @returns array of alphabets
 */
const generateAlphabets = (): string[] =>
  Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

/**
 * Group alphabets into vowels and consonants.
 * @param letters array of alphabets
 * @returns object with vowels and consonants arrays
 */
const groupLetters = (letters: string[]) =>
  letters.reduce(
    (acc, letter) => {
      const vowels = ["a", "e", "i", "o", "u"];

      if (vowels.includes(letter)) acc.vowels.push(letter);
      else acc.consonants.push(letter);

      return acc;
    },
    { vowels: [] as string[], consonants: [] as string[] },
  );

const alphabets = generateAlphabets();

assert.strictEqual(alphabets.length, 26);

const grouped = groupLetters(alphabets);

assert.deepStrictEqual(grouped.vowels, ["a", "e", "i", "o", "u"]);

assert(grouped.consonants.includes("b"));
assert(grouped.consonants.includes("z"));
