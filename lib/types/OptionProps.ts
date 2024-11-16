import type { Property } from "./Property";
import type { ValueMutator } from "./ValueMutator";

export type OptionProps<T, K extends string> = Property<K, T> &
  Property<`onChange${Capitalize<K>}`, ValueMutator<T>>;
