import { useMemo, useRef } from "../dependencies.js";

/**
 * Returns the provided `value` when `shouldUpdate`, called with the new value and the current one, returns `true`. Otherwise, returns the current one.
 * By default, `shouldUpdate` returns `true` if `value` is not `undefined`.
 *
 * @param value The `value` to make resilient.
 * @param shouldUpdate The function called with the new value and the current one that returns `true` if the current value should be updated to the new one.
 * @returns The current value, last udpated when `shouldUpdate` returned `true`.
 */
export function useResilient<T>(
  value: T,
  shouldUpdate: (nextValue: T, currentValue: T) => boolean = defaultUpdate,
): T {
  const previous = useRef(value);
  useMemo(() => {
    if (shouldUpdate(value, previous.current)) {
      previous.current = value;
    }
  }, [value, shouldUpdate]);
  return previous.current;
}

function defaultUpdate<T>(value: T) {
  return value !== undefined;
}
