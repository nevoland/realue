import type { ErrorMessage } from "./ErrorMessage";
import type { ErrorReport } from "./ErrorReport";

export type ErrorReportArray<T extends unknown[]> = {
  [K in keyof T as number]: ErrorReport<T[K]>;
} & {
  ""?: ErrorMessage[];
};
