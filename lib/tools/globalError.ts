import type { ErrorReport, ErrorReportValue } from "../types";

const { isArray } = Array;

export function globalError<T>(
  error?: ErrorReport<T>,
): ErrorReportValue | undefined {
  if (error === undefined) {
    return undefined;
  }
  if (isArray(error)) {
    return error;
  }
  if ("" in error) {
    return error[""];
  }
  return undefined;
}
