import type { ErrorReportArray } from "./ErrorReportArray";
import type { ErrorReportObject } from "./ErrorReportObject";
import type { ErrorReportValue } from "./ErrorReportValue";

export type ErrorReport<T> = [unknown] extends [T]
  ? unknown
  : [NonNullable<T>] extends [readonly unknown[]]
    ? ErrorReportArray<NonNullable<T>>
    : [NonNullable<T>] extends [object]
      ? ErrorReportObject<NonNullable<T>>
      : ErrorReportValue;
