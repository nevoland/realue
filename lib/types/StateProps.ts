import type { Property } from "./Property";
import type { StateMutator } from "./StateMutator";

export type StateProps<T, K extends string> = Property<K, T> &
  Property<`onChange${Capitalize<K>}`, StateMutator<T>>;
