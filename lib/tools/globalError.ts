import type { ErrorMessage, ErrorReport } from "../types";

const { isArray } = Array;

export function globalError<T>(
  error?: ErrorReport<T>,
): ErrorMessage[] | undefined {
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
