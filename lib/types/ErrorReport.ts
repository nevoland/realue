import type { ErrorMessage } from "./ErrorMessage";
import type { ErrorReportArray } from "./ErrorReportArray";
import type { ErrorReportObject } from "./ErrorReportObject";

export type ErrorReport<T, U = NonNullable<T>> = U extends unknown[]
  ? ErrorReportArray<U>
  : U extends object
  ? ErrorReportObject<U>
  : ErrorMessage[];
