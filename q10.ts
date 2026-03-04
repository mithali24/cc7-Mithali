import assert from "assert";

/**
 * Q10:
 * 1. Get foods without "sugar"
 * 2. Get foods with both "chiili" and "oil"
 * 3. Mark foods as "safe" (no sugar) or "unsafe" (contains sugar)
 */

const foods = [
  { idli: ["rice", "urad", "oil", "cashew", "water"] },
  { chapathi: ["atta", "gluten", "water", "oil", "sugar"] },
  { pizza: ["maida", "sugar", "oil", "chilli", "flakes", "sause"] },
  { "paneer masala": ["paneer", "onion", "tomato", "garlic", "oil"] },
];

const noSugar = foods
  .filter((foods) => {
    const ingredients = Object.values(foods)[0]!;
    return !ingredients.includes("sugar");
  })
  .map((food) => Object.keys(food)[0]);

const bothChilliOil = foods
  .filter((foods) => {
    const ingredients = Object.values(foods)[0]!;
    return ingredients.includes("chilli") && ingredients.includes("oil");
  })
  .map((food) => Object.keys(food)[0]);

const safetyCheck = foods.map((foods) => {
  const name = Object.keys(foods)[0];
  const ingredients = Object.values(foods)[0]!;
  return { [name]: ingredients.includes("sugar") ? "unsafe" : "safe" };
});

assert.deepStrictEqual(noSugar, ["idli", "paneer masala"]);
assert.deepStrictEqual(bothChilliOil, ["pizza"]);
assert.deepStrictEqual(safetyCheck, [
  { idli: "safe" },
  { chapathi: "unsafe" },
  { pizza: "unsafe" },
  { "paneer masala": "safe" },
]);
