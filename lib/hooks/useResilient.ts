import { useMemo, useRef } from "../dependencies.js";

/**
 * Returns the provided `value` if `shouldUpdate` is strictly equal to `true` or, when called with the new value and the current one, returns `true`. Otherwise, returns the current one.
 * By default, `shouldUpdate` returns `true` if `value` is not `undefined`.
 *
 * @param value The `value` to make resilient.
 * @param shouldUpdate Either a falsy value, `true`, or a function that is called with the new value and the current one and returns a boolean value.
 * @returns The current value, last udpated when `shouldUpdate` was `true` or returned `true`.
 */
export function useResilient<T>(
  value: T,
  shouldUpdate:
    | ((nextValue: T, currentValue: T) => boolean)
    | boolean = value !== undefined,
): T {
  const previous = useRef(value);
  useMemo(() => {
    if (!shouldUpdate) {
      return;
    }
    if (shouldUpdate === true || shouldUpdate(value, previous.current)) {
      previous.current = value;
    }
  }, [value, shouldUpdate]);
  return previous.current;
}
