import type {
  ErrorReport,
  ErrorReportArray,
  ErrorReportChildren,
  ErrorReportObject,
} from "../types";

const { isArray } = Array;

export function childrenError<T extends unknown[]>(
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
export function childrenError<T extends unknown[] | object>(
  error?: ErrorReport<T>,
):
  | Partial<{
      [K in keyof T]: ErrorReport<T[K]>;
    }>
  | undefined {
  if (error === undefined) {
    return undefined;
  }
  if (isArray(error)) {
    return undefined;
  }
  // NOTE: Includes the global error stored at `""`, but hidden from types
  return error as ErrorReportChildren<T>;
}
