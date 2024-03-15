import { useCallback, useRef } from "preact/hooks";

/**
 * Returns a callback that calls the provided `callback` with both the current and previous value of the argument list.
 *
 * @param callback The callback that receives both the current and previous value of the argument list.
 * @returns A callback that receives the argument value list and returns the result of the provided `callback`.
 */
export function usePreviousArgumentList<T extends any[], U>(
  callback: (current: T, previous: T | undefined) => U,
) {
  const ref = useRef<T>();
  return useCallback(
    (...current: T) => {
      const result = callback(current, ref.current);
      ref.current = current;
      return result;
    },
    [callback],
  );
}
