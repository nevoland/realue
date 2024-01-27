import type { Name } from "./Name";
import type { Property } from "./Property";
import type { ValueMutator } from "./ValueMutator";

export type OptionPropsAdapted<
  T,
  K extends string,
  N extends string = Name,
> = Property<K, T> & Property<`onChange${Capitalize<K>}`, ValueMutator<T, N>>;
