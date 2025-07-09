import type { Dispatch, StateUpdater } from "../dependencies/types";

export type StateDispatcher<T> = Dispatch<StateUpdater<T>>;
