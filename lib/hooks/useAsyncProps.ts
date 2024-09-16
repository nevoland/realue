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
import type { Fetch, Name, NevoProps } from "../types";

import { useAbortController } from "./useAbortController.js";
import { usePromise } from "./usePromise.js";

type AsyncPropsOptions<T, Q> = {
  value?: () => Q;
  onChange?: (value: T, name: Name) => Q;
  fetch: Fetch<T, Q>;
  subscribe?: (query: Q, callback: () => void) => () => void;
};

export function useAsyncProps<T, Q>(
  props: NevoProps<T> | undefined,
  options: AsyncPropsOptions<T, Q>,
  dependencies: Inputs,
): NevoProps<T> & { status: PromiseStatus; onAbort: () => void } {
  const {
    value: queryValue,
    onChange: queryOnChange,
    fetch,
    subscribe,
  } = options;
  const abortController = useAbortController();
  const abort = useRef<AbortController>();
  const query = useRef<Q>();

  const valueStatus = usePromise(
    useMemo(
      () => {
        if (queryValue === undefined) {
          return undefined;
        }
        query.current = queryValue();
        if (query.current === undefined) {
          return undefined;
        }
        abort.current = abortController();
        return fetch(query.current, abort.current);
      },
      dependencies === undefined ? undefined : [fetch, ...dependencies],
    ),
  );

  const { 0: promise, 1: onChangePromise } = useState<Promise<T>>();
  const { 0: value, 1: onChangeValue } = useState<T>();

  const onChange = useMemo(
    () =>
      queryOnChange === undefined && props?.onChange === undefined
        ? undefined
        : (value: T, name: Name) => {
            const query = queryOnChange!(value, name);
            onChangeValue(value);
            props?.onChange?.(value, name);
            if (query === undefined) {
              return;
            }
            abort.current = abortController();
            onChangePromise(fetch(query, abort.current));
          },
    [fetch, ...dependencies],
  );
  const onChangeStatus = usePromise(promise);

  useEffect(() => subscribe(query.current), [query.current]);

  const onAbort = useCallback(() => {
    abort.current?.abort();
  }, EMPTY_ARRAY);

  return {
    ...props,
    onAbort,

    onChange,
    status: reduceStatusList(valueStatus.status, onChangeStatus.status),
    value: valueStatus.value ?? props.value,
  };
}
