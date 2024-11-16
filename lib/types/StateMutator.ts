import type { Dispatch, StateUpdater } from "../dependencies/types";

export type StateMutator<T> = Dispatch<StateUpdater<T>>;
