import type { Inputs } from "preact/hooks";

import {
  EMPTY_ARRAY,
  useCallback,
  useEffect,
  useRef,
} from "../dependencies.js";

/**
 * Creates an on-demand `AbortController` that triggers when the provided `inputs` change (at least when the element unmounts).
 *
 * @returns Callback that returns a new `AbortController`.
 */
export function useAbortController(inputs: Inputs = EMPTY_ARRAY) {
  const controllerRef = useRef<AbortController>();
  useEffect(
    () => () => {
      controllerRef.current?.abort();
    },
    inputs,
  );
  return useCallback(() => {
    controllerRef.current = new AbortController();
    return controllerRef.current;
  }, EMPTY_ARRAY);
}
