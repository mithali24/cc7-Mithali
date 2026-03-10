import assert from "assert";

/**
 * 1. Write a Higher Order function (HOF):
 * createCutOff(cutOffValue)
 * This function returns another function which takes a number
 * and returns true if the number is within the cutoff value.
 */
function createCutOff(cutOffValue: number) {
  return function (num: number): boolean {
    return num <= cutOffValue;
  };
}

const cutOff100 = createCutOff(100);

assert.equal(cutOff100(89), true);

assert.equal(cutOff100(189), false);

assert.equal(cutOff100(100), true);
assert.equal(createCutOff(0)(0), true);
assert.equal(createCutOff(0)(1), false);
