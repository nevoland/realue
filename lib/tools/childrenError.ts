import type {
  ErrorReport,
  ErrorReportArray,
  ErrorReportObject,
} from "../types";

const { isArray } = Array;

/**
 * Returns the mapping of property names or item indices to their error reports found in the provided `error` report.
 * If `error` is a list of strings (i.e., only contains errors for the entire value) or is `undefined`, returns `undefined`.
 *
 * Note that the returned mapping also contains the global error stored at the empty string key `""`, if any, although it is not reflected in the returned type.
 *
 * @example
 * ```ts
 * childrenError({ "": ["Invalid value."], name: ["Missing name."] })?.name; // ["Missing name."]
 * childrenError(["Invalid value."]); // undefined
 * ```
 *
 * @param error The error report of an object or an array.
 * @returns The mapping of children error reports, or `undefined` if there are none.
 */
export function childrenError<T extends readonly any[]>(
  error?: ErrorReportArray<T>,
):
  | Partial<{
      [K in keyof T as number]: ErrorReport<T[K]>;
    }>
  | undefined;
export function childrenError<T extends object>(
  error?: ErrorReportObject<T>,
):
  | Partial<{
      [K in keyof T]: ErrorReport<T[K]>;
    }>
  | undefined;
export function childrenError<T>(error?: ErrorReport<T>): any {
  if (error === undefined) {
    return undefined;
  }
  if (isArray(error)) {
    return undefined;
  }
  // NOTE: Includes the global error stored at `""`, but hidden from types
  return error;
}
