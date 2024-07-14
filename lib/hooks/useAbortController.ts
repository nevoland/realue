import {
  EMPTY_ARRAY,
  useCallback,
  useEffect,
  useRef,
} from "../dependencies.js";

/**
 * Returns a function that creates an `AbortController` and aborts the previous one (if any).
 * The last created `AbortController` is aborted when the component unmounts.
 *
 * @returns Callback that returns a new `AbortController`.
 */
export function useAbortController() {
  const controllerRef = useRef<AbortController>();
  useEffect(
    () => () => {
      controllerRef.current?.abort();
    },
    EMPTY_ARRAY,
  );
  return useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    return controller;
  }, EMPTY_ARRAY);
}
