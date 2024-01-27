import type { ErrorMutator } from "./ErrorMutator";
import type { Name } from "./Name";
import type { ValueMutator } from "./ValueMutator";

export type ObjectProps<T, E> = {
  name: Name;
  value?: T;
  onChange?: ValueMutator<T>;
  error?: E;
  onChangeError?: ErrorMutator<E>;
};
