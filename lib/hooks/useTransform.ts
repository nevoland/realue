import { useMemo } from "../dependencies.js";
import type {
  ErrorMutator,
  ErrorReport,
  NevoProps,
  UseTransformOptions,
  ValueMutator,
} from "../types";

/**
 * Transforms the incoming `value` and the outgoing `value` passed to the `onChange` callback, and optionally the incoming `error` and the outgoing `error` passed to the `onChangeError` callback. If the incoming and outgoing `error` transforms are not provided, returned props will not contain `error` nor `onChangeError`.
 *
 * @param props Properties according to the NEVO pattern.
 * @param options Options for `useTransform`.
 * @returns Updated properties according to the NEVO pattern.
 */
export function useTransform<T, U>(
  props: NevoProps<T>,
  options: UseTransformOptions<T, U>,
): NevoProps<U> {
  const value = useMemo(
    () => options.value(props.value),
    [props.value, options.value],
  );
  const onChange: ValueMutator<U> | undefined = useMemo(
    () =>
      props.onChange === undefined
        ? undefined
        : (value, name) => {
            props.onChange!(options.onChange(value), name);
          },
    [props.onChange, options.onChange],
  );
  const error = useMemo(
    () =>
      options.error === undefined ? undefined : options.error(props.error),
    [props.error, options.error],
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
    [props.onChangeError, options.onChangeError],
  );
  return { error, name: props.name, onChange, onChangeError, value };
}
