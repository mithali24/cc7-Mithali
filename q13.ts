import assert from "assert";

type Quote = {
  text: string;
  author: string;
};

const quotes: Quote[] = [
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "You can observe a lot just by watching.",
    author: "Yogi Berra",
  },
  {
    text: "To invent, you need a good imagination and a pile of junk",
    author: "Thomas Edison",
  },
  {
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Yogi Berra",
  },
  {
    text: "Fate is in your hands and no one elses",
    author: "Byron Pulsifer",
  },
  {
    text: "Be the chief but never the lord.",
    author: "Lao Tzu",
  },
  {
    text: "Nothing happens unless first we dream.",
    author: "Byron Pulsifer",
  },
  {
    text: "Well begun is half done.",
    author: "Aristotle",
  },
  {
    text: "Life is a learning experience, only if you learn.",
    author: "Yogi Berra",
  },
  {
    text: "Self-complacency is fatal to progress.",
    author: "Margaret Sangster",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "What you give is what you get.",
    author: "Byron Pulsifer",
  },
  {
    text: "We can only learn to love by loving.",
    author: "Lao Tzu",
  },
  {
    text: "Life is change. Growth is optional. Choose wisely.",
    author: "Karen Clark",
  },
  {
    text: "You'll see it when you believe it.",
    author: "Buddha",
  },
];

/**
 * Groups quotes by author name.
 * @param quotes array of quote objects
 * @returns object with author names as keys and quote arrays as values
 */
const groupByAuthor = (quotes: Quote[]): Record<string, string[]> =>
  quotes.reduce(
    (acc, q) => {
      if (!acc[q.author]) acc[q.author] = [];
      acc[q.author].push(q.text);
      return acc;
    },
    {} as Record<string, string[]>,
  );

const grouped = groupByAuthor(quotes);

assert.deepStrictEqual(grouped["Buddha"], [
  "Peace comes from within. Do not seek it without.",
  "You'll see it when you believe it.",
]);

/**
 * Returns quotes containing a given word.
 * @param word word to search for
 * @returns array of quote strings
 */
const getQuotesContainingWord = (word: string): string[] =>
  quotes
    .filter((q) => q.text.toLowerCase().includes(word.toLowerCase()))
    .map((q) => q.text);

const dreamQuotes = getQuotesContainingWord("dream");

assert.deepStrictEqual(dreamQuotes, ["Nothing happens unless first we dream."]);

/**
 * Returns array of quote texts.
 * @param quotes array of quote objects
 * @returns array of quote strings
 */
const getQuoteTexts = (quotes: Quote[]): string[] => quotes.map((q) => q.text);

const texts = getQuoteTexts(quotes);

assert.strictEqual(texts.length, quotes.length);

/**
 * Returns unique author names.
 * @param quotes array of quote objects
 * @returns array of unique authors
 */
const getUniqueAuthors = (quotes: Quote[]): string[] =>
  quotes.reduce((acc: string[], q) => {
    if (!acc.includes(q.author)) acc.push(q.author);
    return acc;
  }, []);

const authors = getUniqueAuthors(quotes);

assert.deepStrictEqual(authors, [
  "Thomas Edison",
  "Yogi Berra",
  "Byron Pulsifer",
  "Lao Tzu",
  "Aristotle",
  "Margaret Sangster",
  "Buddha",
  "Karen Clark",
]);
