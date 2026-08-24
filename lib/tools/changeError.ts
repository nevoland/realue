import { setProperty } from "../dependencies.js";
import type {
  ErrorReport,
  ErrorReportArray,
  ErrorReportObject,
} from "../types";

import { isArray } from "./isArray.js";
import { normalizeError } from "./normalizeError.js";

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
