import type { ErrorReport } from "./ErrorReport";
import type { NevoProps } from "./NevoProps";

export type ItemProps<
  T,
  E extends ErrorReport<any> = ErrorReport<T>,
> = NevoProps<T, E> & {
  key: string;
  id: string;
};
