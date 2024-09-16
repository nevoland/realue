import {
  EMPTY_ARRAY,
  useCallback,
  useEffect,
  useState,
} from "../dependencies.js";
import type { ErrorReport, Fetch, NevoProps, PromiseState } from "../types.js";

import { useAbortController } from "./useAbortController.js";
import { usePromise } from "./usePromise.js";

/**
 * Handles a single concurrent request and updates the `value` or `error` through the provided `onChange` and `onChangeError` callbacks. The callback in the returned tuple enables issuing a new request. If the callback is called with no arguments, it resets the request back to the `idle` state, aborting the prior request if it was not fulfilled.
 *
 * @param process An optional request fetcher that defaults to using the standard `fetch` method.
 * @param props The optional `onChange` and `onChangeError` callbacks to notify about the resulting `value` or `error`, and the `name`.
 * @returns A tuple consisting of the current request state and a callback to issue a new request.
 */
export function useProcess<T, Q extends unknown>(
  props: NevoProps<T | undefined>,
  options: {
    query: () => Q;
    process: Fetch<T, Q>;
    subscribe: (request: Q) => void;
  },
): NevoProps<T> {
  const { 0: promise, 1: onChangePromise } = useState<Promise<T>>();
  const processState = usePromise(promise);
  useEffect(() => {
    if (props === undefined) {
      return;
    }
    switch (processState.status) {
      case "pending":
      case "idle":
        return;
      case "rejected": {
        props.onChangeError?.(
          processState.reason as ErrorReport<T>,
          props.name,
        );
        return;
      }
      case "fulfilled": {
        props.onChange?.(processState.value!, props.name);
        return;
      }
      default:
      // Ignore
    }
  }, [processState.status, props?.onChangeError, props?.onChange]);
  const abortController = useAbortController();
  const onChange = useCallback((request?: Q) => {
    if (request === undefined) {
      onChangePromise(undefined);
      return;
    }
    onChangePromise(process(request, abortController()));
  }, EMPTY_ARRAY);
  return { value: processState.value, onChange };
}

function defaultFetch<Q extends Request>(
  request: Q,
  abortController?: AbortController,
) {
  return process(
    abortController === undefined
      ? request
      : { ...request, signal: abortController.signal },
  );
}
