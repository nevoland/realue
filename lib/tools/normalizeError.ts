import { undefinedIfEmpty } from "../dependencies.js";
import type { ErrorReport, ErrorReportValue } from "../types";

/**
 * Normalizes the provided `error` report:
 *   - If it only contains a global error at the empty string key `""`, returns that list of strings instead.
 *   - If it is empty (an empty list or an empty object), returns `undefined`.
 *   - Otherwise, returns it as is.
 *
 * @example
 * ```ts
 * normalizeError({ "": ["Invalid value."] }); // ["Invalid value."]
 * normalizeError({}); // undefined
 * normalizeError([]); // undefined
 * ```
 *
 * @param error The error report to normalize.
 * @returns The normalized error report, or `undefined` if it contains no errors.
 */
export function normalizeError<T>(error: ErrorReport<T> | undefined) {
  if (error === undefined) {
    return undefined;
  }
  if (isOnlyGlobalError(error)) {
    return undefinedIfEmpty(error[""]);
  }
  return undefinedIfEmpty(error);
}

function isOnlyGlobalError(error: any): error is { "": ErrorReportValue } {
  let foundGlobal = false;
  for (const name in error) {
    if (name === "") {
      foundGlobal = true;
    } else {
      return false;
    }
  }
  return foundGlobal;
}
