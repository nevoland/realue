import { undefinedIfEmpty } from "unchangeable";

import type { ErrorReport, ErrorReportValue } from "../types";

export function normalizeError<T>(error: ErrorReport<T> | undefined) {
  if (error === undefined) {
    return undefined;
  }
  if (isOnlyGlobalError(error)) {
    return undefinedIfEmpty(error[""]);
  }
  return undefinedIfEmpty(error);
}

function isOnlyGlobalError(error: object): error is { "": ErrorReportValue } {
  let foundGlobal = false;
  for (const name in error) {
    if (name === "") {
      foundGlobal = true;
    } else {
      return false;
    }
  }
  return foundGlobal;
}
