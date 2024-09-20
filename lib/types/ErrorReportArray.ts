import type { ErrorReport } from "./ErrorReport";
import type { ErrorReportValue } from "./ErrorReportValue";

export type ErrorReportArray<T extends readonly unknown[]> =
  | ({
      readonly [K in keyof T as number]?: ErrorReport<T[K]>;
    } & {
      readonly ""?: ErrorReportValue;
    })
  | ErrorReportValue;
