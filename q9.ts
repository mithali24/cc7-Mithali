import assert from "assert";

/**
 * 9. From the list of people,
 * get an array containing only ages.
 */
const people = [
  {
    name: "John",
    age: 13,
  },
  {
    name: "Mark",
    age: 56,
  },
  {
    name: "Rachel",
    age: 45,
  },
  {
    name: "Nate",
    age: 67,
  },
  {
    name: "Jeniffer",
    age: 65,
  },
];

const ages = people.map((person) => person.age);

assert.deepStrictEqual(ages, [13, 56, 45, 67, 65]);
