import type { ErrorReport } from "./ErrorReport";
import type { NevoProps } from "./NevoProps";

export type ItemProps<T, N extends string> = NevoProps<T, N, ErrorReport<T>> & {
  key: string;
  id: string;
};
