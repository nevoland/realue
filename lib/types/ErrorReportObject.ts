import type { ErrorReport } from "./ErrorReport";
import type { ErrorReportValue } from "./ErrorReportValue";

export type ErrorReportObject<T extends object> = unknown extends T
  ? unknown
  :
      | (Partial<{
          [K in keyof T]: ErrorReport<T[K]>;
        }> & {
          ""?: ErrorReportValue;
        })
      | ErrorReportValue;
