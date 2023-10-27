import { expect, test } from "vitest";

import { capitalize } from "./capitalize";

test("capitalizes", () => {
  expect(capitalize("test")).toBe("Test");
});
