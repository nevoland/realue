import type { ErrorReport, ErrorReportArray, ErrorReportValue } from "../types";

const { isArray } = Array;

export function itemError<T extends unknown[]>(
  error?: ErrorReportArray<T>,
):
  | (Partial<{
      [K in keyof T as number]: ErrorReport<T[K]>;
    }> & {
      ""?: ErrorReportValue;
    })
  | undefined {
  if (error === undefined) {
    return undefined;
  }
  if (isArray(error)) {
    return undefined;
  }
  // NOTE: Includes the global error stored at `""`, but hidden from types
  return error;
}
