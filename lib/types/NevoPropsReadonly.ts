import type { ErrorReport } from "./ErrorReport";
import type { NevoProps } from "./NevoProps";
import type { Select } from "./Select";

export type NevoPropsReadonly<
  T,
  E extends ErrorReport<any> = ErrorReport<T>,
> = Select<NevoProps<T, E>, never, "onChange" | "onChangeError">;
