import type { Inputs, PromiseStatus } from "../dependencies/types";
import {
  EMPTY_ARRAY,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "../dependencies.js";
import type {
  ErrorReport,
  Fetch,
  Name,
  NevoProps,
  NevoPropsReadonly,
  Select,
  Subscribe,
  ValueMutator,
} from "../types";

import { useAbortController } from "./useAbortController.js";
import { usePromise } from "./usePromise.js";
import { useRefresh } from "./useRefresh.js";

type AsyncPropsOptions<T, Q> = {
  value?: (name: Name) => Q | undefined;
  onChange?: (value: T, name: Name) => Q;
  handle: Fetch<T, Q>;
  subscribe?: Subscribe<Q>;
  props?: NevosProps<T>;
};

type AsyncPropsResult<T> = NevoProps<T> & {
  status: PromiseStatus;
  onAbort: () => void;
  onRefresh: () => void;
};

type AsyncPropsState<T, Q> = {
  value?: Readonly<T>;
  error?: ErrorReport<T>;
  valueQuery?: Q;
  changeQuery?: Q;
  abort?: AbortController;
};

/**
 * Properties according to the NEVO pattern, where the `value` sets the initial value of the returned `value`. Optionally supports `status` and `onChangeStatus` for tracking `status` updates.
 */
type NevosProps<T> = NevoProps<T> & {
  status?: PromiseStatus;
  onChangeStatus?: ValueMutator<PromiseStatus>;
};

/**
 * Asynchronously handles getting the `value` and its `onChange`s by `handle`ing queries and `subscribing` to updates.
 *
 * If `options.value(name)` is set, uses the defined return value (a "query") and passes it to `options.handle(query)`. If `options.value(name)` returns an undefined value, nothing happens.
 *
 * If `options.onChange(value, name)` is set, uses the defined return value (a "query") and passes it to `options.handle(query)`. If `options.onChange(value, name)` returns an undefined value, nothing happens.
 *
 * The `options.handle(query)` function returns asynchronously (or, if needed, synchronously) a `value` that gets returned in the result.
 *
 * Asynchronous tasks can be tracked with the returned `status` property, and aborted using the returned `onAbort()` method. Ongoing operations are automatically aborted when the element that runs this hook unmounts.
 *
 * The asynchronous task that gets the `value` can be re-executed using the returned `onRefresh()` method.
 *
 * If `options.subscribe(query, onRefresh)` is defined, it is called everytime a new `query` is returned by `options.value(name)`, and passed along with the `onRefresh(query)` method to trigger a refresh. The `onRefresh(query)` is called with a change query to ignore the queries that emanate from the element using this hook. The `options.subscribe(query, onRefresh)` function can return a function that gets called before a new `options.subcribe(query, onRefresh)` call is made or when the element unmounts, enabling unsubscription logic to happen.
 *
 * @param options Contains the optional `value` and `onChange` query builders, the required `handle(query)` method, the optional `subscribe(query, onRefresh)` method, and the optional parent props according to the NEVO pattern (with support for `status` and `onChangeStatus`).
 * @param dependencies List of values that, when changing, trigger a new asynchronous `value` loading task, if `options.value(name)` is set, refresh the subscription, if `options.subscribe(query, onRefresh)` is set, and updates the definition of the returned `onChange` function.
 * @returns The properties according to the NEVO pattern, with the `status` of the ongoing task, and the `onRefresh()` and `onAbort()` methods.
 */

export function useAsyncProps<T, Q>(
  options: Select<AsyncPropsOptions<T, Q>, "onChange", "props">,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T | undefined>, "onChange", never>;
export function useAsyncProps<T, Q>(
  options: Select<AsyncPropsOptions<T, Q>, never, "onChange" | "props"> & {
    props: NevoPropsReadonly<T>;
  },
  dependencies?: Inputs,
): Select<AsyncPropsResult<T | undefined>, never, "onChange">;
export function useAsyncProps<T, Q>(
  options: Select<AsyncPropsOptions<T, Q>, never, "onChange" | "props">,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T | undefined>, never, "onChange">;
export function useAsyncProps<T, Q>(
  options: Select<AsyncPropsOptions<T, Q>, "onChange", "props"> & {
    props: NevoPropsReadonly<T>;
  },
  dependencies?: Inputs,
): Select<AsyncPropsResult<T>, "onChange", never>;
export function useAsyncProps<T, Q>(
  options: Select<AsyncPropsOptions<T, Q>, "props" | "onChange", never>,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T>, "onChange", never>;
export function useAsyncProps<T, Q>(
  options: Select<AsyncPropsOptions<T, Q>, "props", "onChange">,
  dependencies?: Inputs,
): AsyncPropsResult<T>;
export function useAsyncProps<T, Q>(
  options: AsyncPropsOptions<T, Q>,
  dependencies: Inputs = EMPTY_ARRAY,
): AsyncPropsResult<T> {
  const {
    value: queryValue,
    onChange: queryOnChange,
    handle,
    subscribe,
    props,
  } = options;
  const abortController = useAbortController();
  const state = useRef<AsyncPropsState<T, Q>>({
    value: props?.value,
    error: props?.error,
  });

  useLayoutEffect(() => {
    state.current.value = props?.value;
  }, [props?.value]);

  const refresh = useRefresh();
  const onRefresh = useCallback((query?: Q) => {
    if (query !== undefined && state.current.changeQuery === query) {
      return;
    }
    refresh();
  }, EMPTY_ARRAY);

  const valueState = usePromise(
    useMemo(() => {
      if (queryValue === undefined) {
        return undefined;
      }
      const query = queryValue(props?.name ?? "");
      state.current.valueQuery = query;
      if (query === undefined) {
        return undefined;
      }
      state.current.abort = abortController();
      return handle(query, state.current.abort);
    }, [refresh.value, ...dependencies]),
  );
  useMemo(() => {
    if (state.current.valueQuery === undefined || subscribe === undefined) {
      return;
    }
    return subscribe(state.current.valueQuery, onRefresh);
  }, dependencies);
  useMemo(() => {
    switch (valueState.status) {
      case "idle":
      case "pending":
        return;
      case "fulfilled":
        state.current.value = valueState.value;
        return;
      case "rejected":
        state.current.error = valueState.reason as ErrorReport<T>;
        return;
      default:
      // Ignore
    }
  }, [valueState.status]);

  const { 0: changePromise, 1: setChangePromise } = useState<Promise<T>>();
  const changeState = usePromise(changePromise);
  useMemo(() => {
    switch (changeState.status) {
      case "idle":
      case "pending":
        return;
      case "fulfilled":
        state.current.value = changeState.value;
        return;
      case "rejected":
        state.current.error = changeState.reason as ErrorReport<T>;
        return;
      default:
      // Ignore
    }
  }, [changeState.status]);

  const onChange = useMemo<ValueMutator<T> | undefined>(
    () =>
      queryOnChange === undefined && props?.onChange === undefined
        ? undefined
        : (nextValue, name) => {
            props?.onChange?.(nextValue, name);
            state.current.value = nextValue;
            if (queryOnChange === undefined) {
              return;
            }
            const query = queryOnChange(nextValue, name);
            state.current.changeQuery = query;
            state.current.abort = abortController();
            setChangePromise(handle(query, state.current.abort));
          },
    dependencies,
  );

  const onAbort = useCallback(() => {
    state.current.abort?.abort();
  }, EMPTY_ARRAY);

  const valueStatus = valueState.status;
  const changeStatus = changeState.status;
  const status: PromiseStatus = useMemo(() => {
    if (PROMISE_STATUS_RANK[valueStatus] > PROMISE_STATUS_RANK[changeStatus]) {
      return valueStatus;
    }
    return changeStatus;
  }, [valueStatus, changeStatus]);
  useEffect(() => {
    props?.onChangeStatus?.(status, props?.name);
  }, [status]);

  return {
    error: state.current.error,
    name: props?.name ?? "",
    onAbort,
    onChange,
    onChangeError: props?.onChangeError,
    onRefresh,
    status,
    value: state.current.value as T,
  };
}

const PROMISE_STATUS_RANK: Record<PromiseStatus, number> = {
  idle: 0,
  fulfilled: 1,
  rejected: 2,
  pending: 3,
};
