import { expect, test } from "vitest";
import { isEmpty } from "./isEmpty";

test("returns true for empty objects", () => {
  expect(isEmpty()).toBeTruthy();
  expect(isEmpty(null)).toBeTruthy();
  expect(isEmpty({})).toBeTruthy();
});

test("returns false for non-empty objects", () => {
  expect(isEmpty({ a: 1 })).toBeFalsy();
});
