import type { ErrorReport, ErrorReportObject } from "../types";

const { isArray } = Array;

export function propertyError<T extends object>(
  error?: ErrorReportObject<T>,
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
  return error;
}
