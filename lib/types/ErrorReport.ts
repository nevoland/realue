import type { ErrorReportArray } from "./ErrorReportArray";
import type { ErrorReportObject } from "./ErrorReportObject";
import type { ErrorReportValue } from "./ErrorReportValue";

export type ErrorReport<T, U = NonNullable<T>> = [U] extends [
  readonly unknown[],
]
  ? ErrorReportArray<U>
  : [U] extends [object]
    ? ErrorReportObject<U>
    : ErrorReportValue;
