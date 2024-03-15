import type { Any } from "./Any";
import type { ErrorMutator } from "./ErrorMutator";
import type { ErrorReport } from "./ErrorReport";
import type { Name } from "./Name";
import type { Property } from "./Property";
import type { ValueMutator } from "./ValueMutator";

export type NevoPropsAdapted<
  T,
  K extends string,
  N extends string = Name,
  E extends ErrorReport<Any> = ErrorReport<T>,
> = Property<`${K}Name`, N> &
  Property<`${K}Error`, E> &
  Property<K, T> &
  Property<`onChange${Capitalize<K>}`, ValueMutator<T, N>> &
  Property<`onChange${Capitalize<K>}Error`, ErrorMutator<E, N>>;
