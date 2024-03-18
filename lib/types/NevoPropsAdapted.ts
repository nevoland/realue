import type { ErrorMutator } from "./ErrorMutator";
import type { ErrorReport } from "./ErrorReport";
import type { Name } from "./Name";
import type { Property } from "./Property";
import type { ValueMutator } from "./ValueMutator";

export type NevoPropsAdapted<
  T,
  K extends string,
  E extends ErrorReport<any> = ErrorReport<T>,
> = Property<`${K}Name`, Name> &
  Property<`${K}Error`, E> &
  Property<K, T> &
  Property<`onChange${Capitalize<K>}`, ValueMutator<T>> &
  Property<`onChange${Capitalize<K>}Error`, ErrorMutator<E>>;
