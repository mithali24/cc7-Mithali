import assert from "assert";

/**
 * 8. Extract all emails from address strings.
 * Convert all emails to lowercase.
 */
const addresses = [
  "34, brighten street, email: BS@sft.com",
  "Behind hotel paragon, rode street, micHel@sun.it",
  "ulef court, cown street, email:cown@street",
  "CodeCraft",
];

const emailRegex = /[a-zA-Z][a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+/;

const emails = addresses
  .map((str) => {
    const match = str.match(emailRegex);
    if (match) {
      return match[0].toLowerCase();
    } else {
      return null;
    }
  })
  .filter(Boolean);

assert.deepStrictEqual(emails, ["bs@sft.com", "michel@sun.it"]);
