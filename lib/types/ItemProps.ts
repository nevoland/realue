import type { ErrorReport } from "./ErrorReport";
import type { NevoProps } from "./NevoProps";

export type ItemProps<T> = NevoProps<T, ErrorReport<T>> & {
  key: string;
  id: string;
};
