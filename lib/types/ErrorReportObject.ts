import type { ErrorMessage } from "./ErrorMessage";
import type { ErrorReport } from "./ErrorReport";

export type ErrorReportObject<T extends object> = Partial<{
  [K in keyof T]: ErrorReport<T[K]>;
}> & {
  ""?: ErrorMessage[];
};
