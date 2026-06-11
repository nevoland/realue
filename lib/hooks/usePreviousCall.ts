import { useCallback, useRef } from "../dependencies.js";

/**
 * Calls a callback factory with the previous invocation's parameters and result, then invokes the returned callback with the current parameters.
 *
 * This allows for computations that require working with the previous parameters and result.
 *
 * @param callback - The callback that receives the previous parameters and result of and returns a callback for which the previous parameters and result are provided.
 * @returns A callback that receives the previous parameters and result, and returns a callback for which the previous parameters and result are provided.
 */
export function usePreviousCall<
  C extends (...parameters: readonly unknown[]) => unknown,
>(
  callback: (
    previousParameters: Parameters<C> | undefined,
    previousResult: ReturnType<C> | undefined,
  ) => C,
): C {
  const ref = useRef<{
    parameters: Parameters<C>;
    result: ReturnType<C>;
  }>();
  return useCallback(
    ((...parameters: Parameters<C>) => {
      const result = callback(
        ref.current?.parameters,
        ref.current?.result,
      )(...parameters) as ReturnType<C>;
      ref.current = { parameters, result };
      return result;
    }) as C,
    [callback],
  );
}
