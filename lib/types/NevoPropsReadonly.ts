import type { NevoProps } from "./NevoProps";
import type { Select } from "./Select";

export type NevoPropsReadonly<T> = Select<
  NevoProps<T>,
  never,
  "onChange" | "onChangeError"
>;
