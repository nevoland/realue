import type { ErrorReportValue } from "./ErrorReportValue";
import type { Name } from "./Name";

/**
 * Function that valides a `value` with a given `name` and returns a promise that resolves to an error, if any.
 */
export type ValueValidator<T, N extends string = Name> = (
  value: T,
  name: N,
) => Promise<ErrorReportValue | undefined> | ErrorReportValue | undefined;
