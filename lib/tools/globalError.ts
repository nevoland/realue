import type { ErrorReport, ErrorReportValue } from "../types";

import { isArray } from "./isArray.js";

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
