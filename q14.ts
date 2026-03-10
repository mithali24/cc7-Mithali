import assert from "assert";

type Employee = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  salary: number;
};

const employees: Employee[] = [
  {
    firstName: "Molly",
    lastName: "Rojas",
    age: 38,
    email: "mollyrojas@plasmox.com",
    salary: 3065,
  },
  {
    firstName: "Marguerite",
    lastName: "Santiago",
    age: 27,
    email: "margueritesantiago@plasmox.com",
    salary: 2796,
  },
  {
    firstName: "Evelyn",
    lastName: "Oneil",
    age: 26,
    email: "evelynoneil@plasmox.com",
    salary: 3947,
  },
  {
    firstName: "Consuelo",
    lastName: "Case",
    age: 23,
    email: "consuelocase@plasmox.com",
    salary: 2819,
  },
  {
    firstName: "Earline",
    lastName: "Bush",
    age: 29,
    email: "earlinebush@plasmox.com",
    salary: 3494,
  },
  {
    firstName: "Sanford",
    lastName: "Hurley",
    age: 26,
    email: "sanfordhurley@plasmox.com",
    salary: 3068,
  },
  {
    firstName: "Todd",
    lastName: "Gomez",
    age: 33,
    email: "toddgomez@plasmox.com",
    salary: 3906,
  },
];

/**
 * Calculates total salary for employees whose age is less than 30.
 * @param employees array of employee objects
 * @returns total salary
 */
const totalSalaryUnder30 = (employees: Employee[]): number =>
  employees.filter((e) => e.age < 30).reduce((sum, e) => sum + e.salary, 0);

const total = totalSalaryUnder30(employees);

assert.strictEqual(total, 2796 + 3947 + 2819 + 3494 + 3068);

/**
 * Returns array of employee full names.
 * @param employees array of employee objects
 * @returns array of full names
 */
const getFullNames = (employees: Employee[]): string[] =>
  employees.map((e) => `${e.firstName} ${e.lastName}`);

const fullNames = getFullNames(employees);

assert.deepStrictEqual(fullNames, [
  "Molly Rojas",
  "Marguerite Santiago",
  "Evelyn Oneil",
  "Consuelo Case",
  "Earline Bush",
  "Sanford Hurley",
  "Todd Gomez",
]);

/**
 * Returns a comma separated string of employee emails.
 * @param employees array of employee objects
 * @returns email string
 */
const getEmailsString = (employees: Employee[]): string =>
  employees.map((e) => e.email).join(",");

const emailString = getEmailsString(employees);

assert.strictEqual(
  emailString,
  "mollyrojas@plasmox.com,margueritesantiago@plasmox.com,evelynoneil@plasmox.com,consuelocase@plasmox.com,earlinebush@plasmox.com,sanfordhurley@plasmox.com,toddgomez@plasmox.com",
);
