import { undefinedIfEmpty } from "unchangeable";

import type { ErrorReport, ErrorReportValue } from "../types";

function isOnlyGlobal(error: object): error is { "": ErrorReportValue } {
  for (const name in error) {
    if (name !== "") {
      return false;
    }
  }
  return true;
}

export function normalizedError<T>(error: ErrorReport<T> | undefined) {
  if (error === undefined) {
    return undefined;
  }
  if (isOnlyGlobal(error)) {
    return undefinedIfEmpty(error[""]);
  }
  return undefinedIfEmpty(error);
}
