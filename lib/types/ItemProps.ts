import type { NevoProps } from "./NevoProps";

export type ItemProps<T> = NevoProps<T> & {
  key: string;
  id: string;
};
