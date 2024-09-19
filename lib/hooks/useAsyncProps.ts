import {
  EMPTY_ARRAY,
  type Inputs,
  type PromiseStatus,
  useCallback,
  useEffect,
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

type Subscribe<Q> = (query: Q, onRefresh: () => void) => (() => void) | void;

type AsyncPropsOptions<T, Q> = {
  value?: (name: Name) => Q | undefined;
  onChange?: (value: T, name: Name) => Q | undefined;
  onRemove?: (name: Name) => Q | undefined;
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
  const abort = useRef<AbortController>();
  const valueQuery = useRef<Q>();
  const onChangeQuery = useRef<Q>();
  const [refresh, setRefresh] = useState(false);
  const onRefresh = useCallback(
    () => setRefresh((value) => !value),
    EMPTY_ARRAY,
  );

  const valueStatus = usePromise(
    useMemo(() => {
      if (queryValue === undefined) {
        return undefined;
      }
      const query = queryValue(props?.name ?? "");
      valueQuery.current = query;
      if (query === undefined) {
        return undefined;
      }
      abort.current = abortController();
      return fetch(query, abort.current);
    }, [refresh, ...dependencies]),
  );

  const { 0: promise, 1: setPromise } = useState<Promise<T>>();

  const onChange = useMemo<ValueMutator<Readonly<T>> | undefined>(
    () =>
      queryOnChange === undefined && props?.onChange === undefined
        ? undefined
        : (value, name) => {
            props?.onChange?.(value, name);
            if (queryOnChange === undefined) {
              return;
            }
            const query = queryOnChange(value, name);
            onChangeQuery.current = query;
            if (query === undefined) {
              return;
            }
            abort.current = abortController();
            setPromise(fetch(query, abort.current));
          },
    dependencies,
  );

  const onChangeStatus = usePromise(promise);

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
            if (query === undefined) {
              return;
            }
            abort.current = abortController();
            setPromise(fetch(query, abort.current));
          },
    dependencies,
  );

  useEffect(() => {
    if (valueQuery.current === undefined || subscribe === undefined) {
      return;
    }
    return subscribe(valueQuery.current, onRefresh);
  }, dependencies);

  const onAbort = useCallback(() => {
    abort.current?.abort();
  }, EMPTY_ARRAY);

  const valueStatusError = valueStatus.reason as ErrorReport<T> | undefined;
  const onChangeStatusError = onChangeStatus.reason as
    | ErrorReport<T>
    | undefined;
  const { 0: error, 1: setError } = useState(
    valueStatusError ?? onChangeStatusError,
  );
  const onChangeError = useCallback(
    (error: ErrorReport<T> | undefined, name: Name) => {
      setError(error);
      props?.onChangeError?.(error, name);
    },
    [props?.onChangeError],
  );
  useEffect(() => {
    setError(valueStatusError);
  }, [valueStatusError]);
  useEffect(() => {
    setError(onChangeStatusError);
  }, [onChangeStatusError]);

  const valueStatusStatus = valueStatus.status;
  const onChangeStatusStatus = onChangeStatus.status;
  const status = useMemo(() => {
    if (
      PROMISE_STATUS_RANK[valueStatusStatus] >
      PROMISE_STATUS_RANK[onChangeStatusStatus]
    ) {
      return valueStatusStatus;
    }
    return onChangeStatusStatus;
  }, [valueStatusStatus, onChangeStatusStatus]);
  useEffect(() => {
    props?.onChangeStatus?.(status, props?.name);
  }, [status]);

  const value = (valueStatus.value ?? props?.value) as Readonly<T>;

  return {
    error,
    name: props?.name ?? "",
    onAbort,
    onChange,
    onChangeError,
    onRefresh,
    onRemove,
    status,
    value,
    // TODO: Return `query`
  };
}

const PROMISE_STATUS_RANK: Record<PromiseStatus, number> = {
  idle: 0,
  fulfilled: 1,
  rejected: 2,
  pending: 3,
};
