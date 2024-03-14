import type { ErrorReport } from "./ErrorReport";

export type ErrorReportChildren<T extends unknown[] | object> = Partial<{
  [K in keyof T]: ErrorReport<T[K]>;
}>;
