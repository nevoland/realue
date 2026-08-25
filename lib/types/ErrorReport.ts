import type { ErrorReportArray } from "./ErrorReportArray";
import type { ErrorReportObject } from "./ErrorReportObject";
import type { ErrorReportValue } from "./ErrorReportValue";

export type ErrorReport<T> = [0] extends [1 & T]
  ? any
  : [unknown] extends [T]
    ? unknown
    : [NonNullable<T>] extends [readonly unknown[]]
      ? ErrorReportArray<NonNullable<T>>
      : [NonNullable<T>] extends [object]
        ? ErrorReportObject<NonNullable<T>>
        : ErrorReportValue;
