import type { Inputs } from "../dependencies/types";
import { useMemo, useRef } from "../dependencies.js";

/**
 * Memo hook that allows for a factory function to compute the value based on the currently memoized value.
 *
 * It is useful for cases where a change in dependency would result in the same computed value while producing a new reference. The factory function can then compare the current value with the new one and return the current value if they are the same, avoiding unnecessary re-renders or re-computations in subsequent hooks or components.
 *
 * @example
 * ```tsx
 * useCurrentMemo((currentKeys) => {
 *  const keys = Object.keys(someObject);
 *  if (keys.length === currentKeys.length && keys.every((key) => someObject[key] === currentKeys[key])) {
 *   return currentKeys;
 *  }
 *  return keys;
 * }, [someObject]);
 * ```
 *
 * @param factory Function that returns the value to memoize, receiving the currently memoized value as an argument.
 * @param dependencies Array of dependencies that will trigger a recomputation of the value when changed.
 * @returns The memoized value.
 */
export function useCurrentMemo<T>(
  factory: (current: T | undefined) => T,
  dependencies: Inputs = [],
): T {
  const valueRef = useRef<T>();
  valueRef.current = useMemo(() => factory(valueRef.current), dependencies);
  return valueRef.current;
}
