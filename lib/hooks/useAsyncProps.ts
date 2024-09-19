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
  ValueRemover,
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
  onRemove?: (name: Name) => Q;
  fetch: Fetch<T, Q>;
  subscribe?: Subscribe<Q>;
};

type AsyncPropsResult<T> = NevoProps<T> & {
  status: PromiseStatus;
  onAbort: () => void;
  onRefresh: () => void;
  onRemove?: ValueRemover;
};

type NevoosProps<T> = NevoProps<T> & {
  onRemove?: ValueRemover;
  status?: PromiseStatus;
  onChangeStatus?: ValueMutator<PromiseStatus>;
};

type AsyncPropsState<T, Q> = {
  value?: Readonly<T>;
  error?: ErrorReport<T>;
  valueQuery?: Q;
  mutationQuery?: Q;
  abort?: AbortController;
};

// No parent props
export function useAsyncProps<T, Q>(
  props: undefined,
  options: Select<AsyncPropsOptions<T, Q>, "onRemove" | "onChange", never>,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T | undefined>, "onRemove" | "onChange", never>;
export function useAsyncProps<T, Q>(
  props: undefined,
  options: Select<AsyncPropsOptions<T, Q>, "onRemove", "onChange">,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T | undefined>, "onRemove", "onChange">;
export function useAsyncProps<T, Q>(
  props: undefined,
  options: Select<AsyncPropsOptions<T, Q>, "onChange", "onRemove">,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T | undefined>, "onChange", "onRemove">;
export function useAsyncProps<T, Q>(
  props: undefined,
  options: Select<AsyncPropsOptions<T, Q>, never, "onRemove" | "onChange">,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T | undefined>, never, "onRemove" | "onChange">;
// With parent props
export function useAsyncProps<T, Q>(
  props: NevoosProps<T>,
  options: Select<AsyncPropsOptions<T, Q>, "onRemove" | "onChange", never>,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T>, "onRemove" | "onChange", never>;
export function useAsyncProps<T, Q>(
  props: NevoosProps<T>,
  options: Select<AsyncPropsOptions<T, Q>, "onChange", "onRemove">,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T>, "onChange", never>;
export function useAsyncProps<T, Q>(
  props: NevoosProps<T>,
  options: Select<AsyncPropsOptions<T, Q>, "onRemove", "onChange">,
  dependencies?: Inputs,
): Select<AsyncPropsResult<T>, "onRemove", never>;
export function useAsyncProps<T, Q>(
  props: NevoosProps<T>,
  options: Select<AsyncPropsOptions<T, Q>, never, "onRemove" | "onChange">,
  dependencies?: Inputs,
): AsyncPropsResult<T>;
// Implementation
export function useAsyncProps<T, Q>(
  props: NevoosProps<T> | undefined,
  options: AsyncPropsOptions<T, Q>,
  dependencies: Inputs = EMPTY_ARRAY,
): AsyncPropsResult<T> {
  const {
    value: queryValue,
    onChange: queryOnChange,
    onRemove: queryOnRemove,
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
    if (state.current.mutationQuery === query) {
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
  const mutationState = usePromise(promise);
  useMemo(() => {
    switch (mutationState.status) {
      case "idle":
      case "pending":
        return;
      case "fulfilled":
        state.current.value = mutationState.value;
        return;
      case "rejected":
        state.current.error = mutationState.reason as ErrorReport<T>;
        return;
      default:
      // Ignore
    }
  }, [mutationState.status]);

  const onChange = useMemo<ValueMutator<Readonly<T>> | undefined>(
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
            state.current.mutationQuery = query;
            state.current.abort = abortController();
            setPromise(fetch(query, state.current.abort));
          },
    dependencies,
  );

  const onRemove = useMemo<ValueRemover | undefined>(
    () =>
      queryOnRemove === undefined && props?.onRemove === undefined
        ? undefined
        : (name) => {
            props?.onRemove?.(name);
            if (queryOnRemove === undefined) {
              return;
            }
            const query = queryOnRemove(name);
            state.current.mutationQuery = query;
            state.current.abort = abortController();
            setPromise(fetch(query, state.current.abort));
          },
    dependencies,
  );

  const onAbort = useCallback(() => {
    state.current.abort?.abort();
  }, EMPTY_ARRAY);

  const valueStatus = valueState.status;
  const mutationStatus = mutationState.status;
  const status: PromiseStatus = useMemo(() => {
    if (
      PROMISE_STATUS_RANK[valueStatus] > PROMISE_STATUS_RANK[mutationStatus]
    ) {
      return valueStatus;
    }
    return mutationStatus;
  }, [valueStatus, mutationStatus]);
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
    onRemove,
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
