import type { ErrorReport } from "./ErrorReport";
import type { ErrorReportValue } from "./ErrorReportValue";
import type { NevoProps } from "./NevoProps";

/**
 * Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.
 *
 * @param propertyName The name of the property for which to generate the props.
 */
export interface PropertyCallable<T extends object> {
  <K extends keyof T>(
    propertyName: K,
  ): NevoProps<T[K], ErrorReport<T[K]>> & { key: string };
  (): NevoProps<T, ErrorReportValue>;
}
