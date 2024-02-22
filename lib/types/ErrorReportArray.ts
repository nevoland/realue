import type { ErrorReport } from "./ErrorReport";
import type { ErrorReportValue } from "./ErrorReportValue";

export type ErrorReportArray<T extends unknown[]> =
  | (Partial<{
      [K in keyof T as number]: ErrorReport<T[K]>;
    }> & {
      ""?: ErrorReportValue;
    })
  | ErrorReportValue;
