import type { ErrorReport, ErrorReportValue } from "../types";

import { isArray } from "./isArray.js";

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
