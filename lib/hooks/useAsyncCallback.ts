import type { Inputs } from "../dependencies/types";
import { useCallback, useState } from "../dependencies.js";
import type { PromiseState } from "../types";

import { usePromise } from "./usePromise.js";

/**
 * A hook that returns a callback function that will execute the given async function and return its result, and the state of the promise returned by the async function.
 *
 * @param callback The async function to be executed.
 * @param dependencies The dependencies array for the useCallback hook.
 * @returns A tuple containing the async callback function and the promise state.
 */
export function useAsyncCallback<
  C extends (...args: readonly any[]) => Promise<any>,
>(callback: C, dependencies: Inputs): [C, PromiseState<ReturnType<C>>] {
  const [promise, setPromise] = useState<Promise<ReturnType<C>>>();

  const asyncCallback = useCallback((...args: Parameters<C>) => {
    const promise = callback(...args);
    setPromise(promise);
    return promise;
  }, dependencies);

  return [asyncCallback as C, usePromise(promise)];
}
