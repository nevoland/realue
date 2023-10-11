import { expect, test } from "vitest";

import { setItem } from "./setItem";

test("sets an item by returning a new array", () => {
  const array = [1];
  expect(setItem([1], 0, 2)).toEqual([2]);
  expect(setItem(array, 0, 2)).not.toBe(array);
});

test("returns the array untouched", () => {
  expect(setItem([1], -1, 2)).toEqual([1]);
  expect(setItem([1], 1, 2)).toEqual([1]);
});

test("returns an empty array if undefined", () => {
  expect(setItem(undefined, 0, 2)).toEqual([]);
});
