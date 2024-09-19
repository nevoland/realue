import {
  EMPTY_ARRAY,
  type Inputs,
  type PromiseStatus,
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
  Select,
  ValueMutator,
} from "../types";

import { useAbortController } from "./useAbortController.js";
import { usePromise } from "./usePromise.js";

type Subscribe<Q> = (
  query: Q,
  onRefresh: (query: Q) => void,
) => (() => void) | void;

type AsyncPropsOptions<T, Q> = {
  value?: (name: Name) => Q | undefined;
  onChange?: (value: T, name: Name) => Q;
  fetch: Fetch<T, Q>;
  subscribe?: Subscribe<Q>;
};

type AsyncPropsResult<T> = NevoProps<T> & {
  status: PromiseStatus;
  onAbort: () => void;
  onRefresh: () => void;
};

type NevosProps<T> = NevoProps<T> & {
  status?: PromiseStatus;
  onChangeStatus?: ValueMutator<PromiseStatus>;
};

type AsyncPropsState<T, Q> = {
  value?: Readonly<T>;
  error?: ErrorReport<T>;
  valueQuery?: Q;
  changeQuery?: Q;
  abort?: AbortController;
};

// No parent props
export function useAsyncProps<T, Q>(
  props: undefined,
  options: Select<AsyncPropsOptions<T, Q>, "onChange", never>,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T | undefined>, "onChange", never>;
export function useAsyncProps<T, Q>(
  props: undefined,
  options: Select<AsyncPropsOptions<T, Q>, never, "onChange">,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T | undefined>, never, "onChange">;
// With parent props
export function useAsyncProps<T, Q>(
  props: NevosProps<T>,
  options: Select<AsyncPropsOptions<T, Q>, "onChange", never>,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T>, "onChange", never>;
export function useAsyncProps<T, Q>(
  props: NevosProps<T>,
  options: Select<AsyncPropsOptions<T, Q>, never, "onChange">,
  dependencies?: Inputs,
): AsyncPropsResult<T>;
// Implementation
export function useAsyncProps<T, Q>(
  props: NevosProps<T> | undefined,
  options: AsyncPropsOptions<T, Q>,
  dependencies: Inputs = EMPTY_ARRAY,
): AsyncPropsResult<T> {
  const {
    value: queryValue,
    onChange: queryOnChange,
    fetch,
    subscribe,
  } = options;
  const abortController = useAbortController();
  const state = useRef<AsyncPropsState<T, Q>>({
    value: props?.value,
    error: props?.error,
  });

  useLayoutEffect(() => {
    state.current.value = props?.value;
  }, [props?.value]);

  const [refresh, setRefresh] = useState(false);
  const onRefresh = useCallback((query?: Q) => {
    if (state.current.changeQuery === query) {
      return;
    }
    setRefresh((value) => !value);
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
      return fetch(query, state.current.abort);
    }, [refresh, ...dependencies]),
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

  const { 0: promise, 1: setPromise } = useState<Promise<T>>();
  const changeState = usePromise(promise);
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
            setPromise(fetch(query, state.current.abort));
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
    value: state.current.value as Readonly<T>,
  };
}

const PROMISE_STATUS_RANK: Record<PromiseStatus, number> = {
  idle: 0,
  fulfilled: 1,
  rejected: 2,
  pending: 3,
};
