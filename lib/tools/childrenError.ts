import type {
  ErrorReport,
  ErrorReportArray,
  ErrorReportObject,
} from "../types";

const { isArray } = Array;

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
