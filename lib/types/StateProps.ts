import type { Property } from "./Property";
import type { StateDispatcher } from "./StateDispatcher";

export type StateProps<T, K extends string> = Property<K, T> &
  Property<`onChange${Capitalize<K>}`, StateDispatcher<T>>;
