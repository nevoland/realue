import { reduceStatusList } from "futurise";

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
  ValueMutator,
  ValueRemover,
} from "../types";

import { useAbortController } from "./useAbortController.js";
import { usePromise } from "./usePromise.js";

type Subscribe<Q> = (query: Q, onRefresh: () => void) => (() => void) | void;

type AsyncPropsOptions<T, Q> = {
  value?: (name: Name) => Q | void;
  onChange?: (value: T, name: Name) => Q | void;
  onRemove?: (name: Name) => Q | void;
  fetch: Fetch<T, Q>;
  subscribe?: Subscribe<Q>;
};

export function useAsyncProps<T, Q>(
  props: undefined,
  options: AsyncPropsOptions<T, Q>,
  dependencies?: Inputs,
): NevoProps<T | undefined> & {
  status: PromiseStatus;
  onAbort: () => void;
  onRefresh: () => void;
  onRemove?: ValueRemover;
};
export function useAsyncProps<T, Q>(
  props: NevoProps<T> & { onRemove?: ValueRemover },
  options: AsyncPropsOptions<T, Q>,
  dependencies?: Inputs,
): NevoProps<T> & {
  status: PromiseStatus;
  onAbort: () => void;
  onRefresh: () => void;
  onRemove?: ValueRemover;
};
export function useAsyncProps<T, Q>(
  props: (NevoProps<T> & { onRemove?: ValueRemover }) | undefined,
  options: AsyncPropsOptions<T, Q>,
  dependencies: Inputs = EMPTY_ARRAY,
): NevoProps<T> & {
  status: PromiseStatus;
  onAbort: () => void;
  onRefresh: () => void;
  onRemove?: ValueRemover;
} {
  const {
    value: queryValue,
    onChange: queryOnChange,
    onRemove: queryOnRemove,
    fetch,
    subscribe,
  } = options;
  const abortController = useAbortController();
  const abort = useRef<AbortController>();
  const query = useRef<Q>();
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
      query.current = queryValue(props?.name ?? "");
      if (query.current === undefined) {
        return undefined;
      }
      abort.current = abortController();
      return fetch(query.current, abort.current);
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
    if (query.current === undefined || subscribe === undefined) {
      return;
    }
    return subscribe(query.current, onRefresh);
  }, [subscribe, ...dependencies]);

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

  return {
    error,
    name: props?.name ?? "",
    onAbort,
    onChange,
    onChangeError,
    onRefresh,
    onRemove,
    status: reduceStatusList(valueStatus.status, onChangeStatus.status),
    value: (valueStatus.value ?? props?.value) as Readonly<T>,
  };
}
