import type { Inputs } from "../dependencies/types";
import { EMPTY_ARRAY, EMPTY_OBJECT, useMemo, useRef } from "../dependencies.js";
import type {
  ErrorMutator,
  ErrorReport,
  NevoProps,
  UseTransformOptions,
  ValueMutator,
} from "../types";

/**
 * Transforms the incoming `value` and the outgoing `value` passed to the `onChange` callback, and optionally the incoming `error` and the outgoing `error` passed to the `onChangeError` callback.
 *
 * If the incoming and outgoing `error` transforms are not provided, returned props will not contain `error` nor `onChangeError`.
 *
 * @param props Properties according to the NEVO pattern.
 * @param options Options for `useTransform`.
 * @param dependencies List of values that, when changing, update the `value`, the `error`, and the mutators.
 * @returns Updated properties according to the NEVO pattern.
 */
export function useTransform<T, U>(
  props: NevoProps<T>,
  options: UseTransformOptions<T, U>,
  dependencies: Inputs = EMPTY_ARRAY,
): NevoProps<U> {
  const cache = useRef<{ value: T; transformedValue: U }>(EMPTY_OBJECT);

  useMemo(() => {
    cache.current = EMPTY_OBJECT;
  }, dependencies);

  const value = useMemo(() => {
    const currentCache = cache.current;
    if (currentCache.value === props.value) {
      return currentCache.transformedValue;
    }
    const transformedValue = options.value(props.value);
    cache.current = { value: props.value, transformedValue };
    return transformedValue;
  }, [props.value, ...dependencies]);

  const onChange: ValueMutator<U> | undefined = useMemo(
    () =>
      props.onChange === undefined
        ? undefined
        : (value, name) => {
            const currentCache = cache.current;
            if (currentCache.transformedValue === value) {
              props.onChange!(currentCache.value, name);
              return;
            }
            const nextValue = options.onChange(value);
            cache.current = { value: nextValue, transformedValue: value };
            props.onChange!(nextValue, name);
          },
    [props.onChange, ...dependencies],
  );

  const error = useMemo(
    () =>
      options.error === undefined ? undefined : options.error(props.error),
    [props.error, ...dependencies],
  );

  const onChangeError: ErrorMutator<ErrorReport<U>> | undefined = useMemo(
    () =>
      props.onChangeError === undefined
        ? undefined
        : options.onChangeError === undefined
          ? undefined
          : (error, name) => {
              props.onChangeError!(options.onChangeError!(error), name);
            },
    [props.onChangeError, ...dependencies],
  );

  return { error, name: props.name, onChange, onChangeError, value };
}
