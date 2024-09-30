import {
  type Dispatch,
  type StateUpdater,
  useCallback,
  useMemo,
  useRef,
} from "../dependencies.js";
import type { Name } from "../types.js";

import { useRefresh } from "./useRefresh.js";

/**
 * Creates a state that is synced with its parent state.
 * If the provided `state` changes, the returned `state` is set to that provided state.
 * Calls to the returned `setState(state)` also triggers a call to the optionally provided `setState(state)`.
 *
 * @param state The provided parent state.
 * @param setState The optional parent state udpater.
 * @returns The `[state, setState]` tuple.
 */
export function useSyncedState<T>(value: T): [T, Dispatch<StateUpdater<T>>];
export function useSyncedState<T>(
  value: T,
  setValue: Dispatch<StateUpdater<T>>,
): [T, Dispatch<StateUpdater<T>>];
export function useSyncedState<T>(
  value: T,
  setValue?: Dispatch<StateUpdater<T>>,
): [T, (value: T, name?: Name) => void] {
  const onRefresh = useRefresh();
  const state = useRef(value);
  useMemo(() => {
    state.current = value;
  }, [value]);
  const onChangeState = useCallback(
    (value: StateUpdater<T>) => {
      state.current =
        typeof value === "function" ? (value as any)(state.current) : value;
      onRefresh();
      setValue?.(state.current);
    },
    [setValue],
  );
  return [state.current, onChangeState];
}
