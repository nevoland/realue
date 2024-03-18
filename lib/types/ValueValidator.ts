import type { ErrorReport, Name } from "../types";

/**
 * Function that valides a `value` with a given `name` and returns a promise that resolves to an error, if any.
 */
export type ValueValidator<T, E extends ErrorReport<any> = ErrorReport<T>> = (
  value: T,
  name: Name,
  error: E | undefined,
) => Promise<E | undefined> | E | undefined;
