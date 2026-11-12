import { useCallback, useEffect, useSignal } from "../dependencies.js";

/**
 * Creates a local signal-backed state that is synced with the provided `value`.
 * If the provided `value` changes, the local state is set to that value.
 * The local state can be updated with the returned setter, which does not notify the parent.
 *
 * @param value The provided value to sync the local state with.
 * @returns The `[value, setValue]` tuple, with `value` being the current local state and `setValue(value)` updating it.
 */
export function useSyncedSignal<T>(value: T): [T, (value: T) => void] {
  const signal = useSignal(value);
  useEffect(() => {
    signal.value = value;
  }, [value]);
  return [
    signal.value,
    useCallback((value: T) => {
      signal.value = value;
    }, []),
  ];
}
