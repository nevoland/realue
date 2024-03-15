import { useEffect, useRef } from "preact/hooks";

/**
 * Returns the previous value.
 *
 * @param value Value from which to get the previous value from.
 * @returns The previous value.
 */
export function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
