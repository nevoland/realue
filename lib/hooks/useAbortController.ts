import {
  EMPTY_ARRAY,
  useCallback,
  useEffect,
  useState,
} from "../dependencies.js";

/**
 * Creates an on-demand `AbortController` that triggers when the provided `inputs` change (at least when the element unmounts).
 *
 * @returns Callback that returns a new `AbortController`.
 */
export function useAbortController() {
  const [controller, onChangeController] = useState<AbortController>();
  useEffect(
    () => () => {
      controller?.abort();
    },
    [controller],
  );
  return useCallback(() => {
    const controller = new AbortController();
    onChangeController(controller);
    return controller;
  }, EMPTY_ARRAY);
}
