import type { ErrorReportArray } from "./ErrorReportArray";
import type { NevoProps } from "./NevoProps";

export type ItemProps<
  T,
  N extends string,
  E extends ErrorReportArray<T[]>,
> = NevoProps<T, N, E[number]> & { key: string; id: string };
