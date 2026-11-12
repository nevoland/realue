import { setProperty } from "../dependencies.js";
import type {
  ErrorReport,
  ErrorReportArray,
  ErrorReportObject,
} from "../types";

import { isArray } from "./isArray.js";
import { normalizeError } from "./normalizeError.js";

/**
 * Returns a new error report out of the provided `error` report of an object or an array, where the error report of the child with the specified `itemName` is set to `itemError`.
 * If `itemName` is the empty string `""`, sets the error that pertains to the entire value.
 *
 * The resulting error report is normalized: if only a global error remains, it is returned as a list of strings, and if it is empty, `undefined` is returned.
 *
 * Does not mutate the provided `error` report.
 *
 * @example
 * ```ts
 * changeError({ name: ["Missing name."] }, "level", ["Must be positive."]);
 * // { name: ["Missing name."], level: ["Must be positive."] }
 * changeError({ name: ["Missing name."] }, "name", undefined);
 * // undefined
 * changeError(["Invalid value."], "name", ["Missing name."]);
 * // { "": ["Invalid value."], name: ["Missing name."] }
 * ```
 *
 * @param error The error report of an object or an array.
 * @param itemName The property name or item index of the child, or `""` for the entire value.
 * @param itemError The error report to set for the child, or `undefined` to remove it.
 * @returns The updated error report, or `undefined` if there are no errors left.
 */
export function changeError<T extends readonly any[] | undefined>(
  error: ErrorReportArray<NonNullable<T>> | undefined,
  itemName: number | "",
  itemError: ErrorReport<NonNullable<T>[number]> | undefined,
): ErrorReportArray<NonNullable<T>> | undefined;
export function changeError<T extends object | undefined>(
  error: ErrorReportObject<NonNullable<T>> | undefined,
  itemName: keyof NonNullable<T> | "",
  itemError: ErrorReport<NonNullable<T>[keyof NonNullable<T>]> | undefined,
): ErrorReportObject<NonNullable<T>> | undefined;
export function changeError(
  error: any,
  itemName: PropertyKey | "",
  itemError: any,
): any {
  if (isArray(error)) {
    if (itemName === "" || itemError === undefined) {
      return itemError;
    }
    return {
      "": error,
      [itemName]: itemError,
    };
  }
  return normalizeError(setProperty(error, itemName, itemError));
}
