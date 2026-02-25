import assert from "assert";

/**
 * Returns the numeric index of a day of the week.
 * Sunday = 0, Monday = 1, ..., Saturday = 6.
 * Returns -1 for invalid day names.
 *
 * @param dayName - Three-letter day abbreviation (case-insensitive)
 * @returns Numeric representation of the day or -1 if invalid
 */
function getDayOfWeek(dayName: string): number {
  const days: Record<string, number> = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  const key = dayName.toLowerCase();
  return days[key] ?? -1;
}

// Test cases
assert.strictEqual(getDayOfWeek("sun"), 0, "Should return 0 for Sunday");

assert.strictEqual(
  getDayOfWeek("Mon"),
  1,
  "Should handle case-insensitive input",
);

assert.strictEqual(
  getDayOfWeek("fri"),
  5,
  "Should return correct index for Friday",
);

assert.strictEqual(getDayOfWeek("xyz"), -1, "Should return -1 for invalid day");

assert.strictEqual(
  getDayOfWeek("SAT"),
  6,
  "Should handle uppercase input correctly",
);
