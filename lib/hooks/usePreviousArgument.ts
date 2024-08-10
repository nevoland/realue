import { useCallback, useRef } from "../dependencies.js";

/**
 * Returns a unary callback that calls the provided `callback` with both the current and previous value of the argument. Can be used for computations that require working with the previous value.
 *
 * @param callback The callback that receives both the current and previous value of the argument.
 * @returns A callback that receives the argument value and returns the result of the provided `callback`.
 */
export function usePreviousArgument<T, U>(
  callback: (value: T, previousValue: T | undefined) => U,
) {
  const ref = useRef<T>();
  return useCallback(
    (value: T) => {
      const result = callback(value, ref.current);
      ref.current = value;
      return result;
    },
    [callback],
  );
}
