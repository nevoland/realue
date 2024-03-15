import type { ErrorReport } from "../types";

import { isArray } from "./isArray.js";

/**
 * Returns `true` if the two provided error values have the same errors messages.
 *
 * @param a Error value
 * @param b Error value
 * @returns `true` if the two provided error values are equal.
 */
export function isEqualError<T>(
  a?: ErrorReport<T>,
  b?: ErrorReport<T>,
): boolean {
  if (a === b) {
    return true;
  }
  if (a === undefined || b === undefined) {
    return false;
  }
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((value, index) => value === b[index]);
  }
  if (isArray(a) || isArray(b)) {
    return false;
  }
  const propertyListA = Object.keys(a!);
  const propertyListB = Object.keys(b!);
  if (propertyListA.length !== propertyListB.length) {
    return false;
  }
  return propertyListA.every((property) =>
    isEqualError((a as any)[property], (b as any)[property]),
  );
}
