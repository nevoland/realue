import type { ErrorReport } from "./ErrorReport";
import type { ErrorReportObject } from "./ErrorReportObject";
import type { NevoProps } from "./NevoProps";

/**
 * Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.
 *
 * @param propertyName The name of the property for which to generate the props.
 */
export interface PropertyCallable<
  T extends object,
  N extends string,
  E extends ErrorReportObject<T>,
> {
  <K extends keyof T>(
    propertyName: K,
  ): NevoProps<
    T[K],
    N,
    Partial<{ [K in keyof T]: ErrorReport<T[K], NonNullable<T[K]>> }>[K]
  > & { key: string };
  (): NevoProps<T, N, E[""]>;
}
