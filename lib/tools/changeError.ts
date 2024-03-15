import { setProperty } from "../dependencies.js";
import type {
  ErrorReport,
  ErrorReportArray,
  ErrorReportObject,
  ErrorReportValue,
} from "../types";

import { isArray } from "./isArray.js";
import { normalizeError } from "./normalizeError.js";

export function changeError<
  T extends object | undefined,
  E extends ErrorReportObject<NonNullable<T>>,
>(
  error: E | undefined,
  itemName: keyof E | "",
  itemError: ErrorReportValue | E[keyof E] | undefined,
): E | undefined;
export function changeError<
  T extends any[] | undefined,
  E extends ErrorReportArray<NonNullable<T>>,
>(
  error: E | undefined,
  itemName: number | "",
  itemError: ErrorReportValue | E[number] | undefined,
): E | undefined;
export function changeError<
  T extends object | any[] | undefined,
  E extends ErrorReport<NonNullable<T>>,
>(
  error: E | undefined,
  itemName: keyof E | "",
  itemError: ErrorReportValue | E[keyof E] | undefined,
): E | undefined {
  if (isArray(error)) {
    if (itemName === "" || itemError === undefined) {
      return itemError as E | undefined;
    }
    return {
      "": error,
      [itemName]: itemError,
    } as E;
  }
  return normalizeError(
    setProperty(error, itemName as keyof E, itemError as any),
  ) as E | undefined;
}
