import { expect, test } from "vitest";
import { setProperty } from "./setProperty";
import { EMPTY_OBJECT } from "../constants";

test("sets a property by returning a new object", () => {
  const object = { a: 1 };
  expect(setProperty(object, "a", 2)).toEqual({ a: 2 });
  expect(setProperty(object, "a", 2)).not.toBe(object);
  expect(setProperty<{ a: number; b?: number }>({ a: 1 }, "b", 2)).toEqual({
    a: 1,
    b: 2,
  });
});

test("removes a property", () => {
  expect(setProperty({ a: 1, b: 2 }, "a", undefined)).toEqual({ b: 2 });
  expect(setProperty({ a: 1 }, "a", undefined)).toBe(EMPTY_OBJECT);
});

test("returns the object untouched", () => {
  const object = { a: 1 };
  expect(setProperty(object, "a", 1)).toBe(object);
});

test("returns an empty object if undefined", () => {
  expect(setProperty<{ a?: any }, any>(undefined, "a", undefined)).toBe(
    EMPTY_OBJECT,
  );
});
