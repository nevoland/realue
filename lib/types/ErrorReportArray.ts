import type { ErrorReport } from "./ErrorReport";
import type { ErrorReportValue } from "./ErrorReportValue";

export type ErrorReportArray<T extends readonly any[]> =
  | ({
      readonly [K in number]?: ErrorReport<T[K]>;
    } & {
      readonly ""?: ErrorReportValue;
    })
  | ErrorReportValue;
