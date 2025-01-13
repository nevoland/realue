import type { Dispatch, StateUpdater } from "../dependencies/types";
import { useCallback, useMemo, useRef, useState } from "../dependencies.js";
import type { StateMutator } from "../types/StateMutator";

/**
 * Creates a state that is synced with its parent state.
 * If the provided `state` changes, the returned `state` is set to that provided state.
 * Calls to the returned `setState(state)` also triggers a call to the optionally provided `setState(state)`.
 *
 * @param state The provided parent state.
 * @param setState The optional parent state udpater.
 * @returns The `[state, setState]` tuple.
 */
export function useSyncedState<T>(
  value: T,
  setValue?: Dispatch<T>,
): [T, StateMutator<T>] {
  const onRefresh = useState(false)[1];
  const state = useRef(value);
  useMemo(() => {
    state.current = value;
  }, [value]);
  const onChangeState = useCallback(
    (value: StateUpdater<T>) => {
      const nextValue =
        typeof value === "function" ? (value as any)(state.current) : value;
      if (nextValue === state.current) {
        return;
      }
      onRefresh((state) => !state);
      setValue?.(state.current);
    },
    [setValue],
  );
  return [state.current, onChangeState];
}
