import { expect, test } from "vitest";

import { capitalize } from "./capitalize.js";

test("capitalizes", () => {
  expect(capitalize("test")).toBe("Test");
});
