import type { ErrorReport, ErrorReportValue } from "../types";

import { isArray } from "./isArray.js";

/**
 * Returns the error messages that pertain to the entire value of the provided `error` report.
 * If `error` is a list of strings, returns it as is. Otherwise, returns the list of strings found at the empty string key `""`, if any.
 *
 * @example
 * ```ts
 * globalError(["Invalid value."]); // ["Invalid value."]
 * globalError({ "": ["Invalid value."], name: ["Missing name."] }); // ["Invalid value."]
 * globalError({ name: ["Missing name."] }); // undefined
 * ```
 *
 * @param error The error report.
 * @returns The list of error messages for the entire value, or `undefined` if there are none.
 */
export function globalError<T>(
  error?: ErrorReport<T>,
): ErrorReportValue | undefined {
  if (error == null) {
    return undefined;
  }
  if (isArray(error)) {
    return error;
  }
  if ("" in (error as any)) {
    return (error as any)[""];
  }
  return undefined;
}
