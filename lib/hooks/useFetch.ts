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
 * Handles a single concurrent request and updates the `value` or `error` through the provided `onChange` and `onChangeError` callbacks. The callback in the returned tuple enables issuing new request. If the callback is called with no argument, it resets the request back to the `idle` state, aborting the prior request if it was not fulfilled.
 *
 * @param fetch An optional request fetcher that defaults to using the standard `fetch` method.
 * @param props The optional `onChange` and `onChangeError` callbacks to notify about the resulting `value` or `error`, and the `name`.
 * @returns A tuple consisting of the current request state and a callback to issue a new request.
 */
export function useFetch<T extends object, Q extends unknown>(
  fetch: Fetch<T, Q> = defaultFetch as Fetch<T, Q>,
  props?: NevoProps<T>,
): [PromiseState<T>, (request: Q) => void] {
  const [promise, onChangePromise] = useState<Promise<T>>();
  const requestState = usePromise(promise);
  useEffect(() => {
    if (props === undefined) {
      return;
    }
    switch (requestState.status) {
      case "pending":
      case "idle":
        return;
      case "rejected": {
        props.onChangeError?.(
          requestState.reason as ErrorReport<T>,
          props.name,
        );
        return;
      }
      case "fulfilled": {
        props.onChange?.(requestState.value!, props.name);
        return;
      }
      default:
      // Ignore
    }
  }, [requestState.status, props?.onChangeError, props?.onChange]);
  const abortController = useAbortController();
  const onRequest = useCallback((request?: Q) => {
    if (request === undefined) {
      onChangePromise(undefined);
      return;
    }
    onChangePromise(fetch(request, abortController()));
  }, EMPTY_ARRAY);
  return [requestState, onRequest];
}

function defaultFetch<Q extends Request>(
  request: Q,
  abortController?: AbortController,
) {
  return fetch(
    abortController === undefined
      ? request
      : { ...request, signal: abortController.signal },
  );
}
