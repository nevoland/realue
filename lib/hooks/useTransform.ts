import { useMemo } from "../dependencies.js";
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
 * @param props The props holding the `value` and `onChange` callbacks.
 * @param options Options for `useTransform`.
 * @returns Updated props.
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
      options.error === undefined
        ? (props.error as unknown as ErrorReport<U>)
        : options.error(props.error),
    [props.error, options.error],
  );
  const onChangeError: ErrorMutator<ErrorReport<U>> | undefined = useMemo(
    () =>
      props.onChangeError === undefined
        ? undefined
        : options.onChangeError === undefined
        ? (props.onChangeError as unknown as ErrorMutator<ErrorReport<U>>)
        : (error, name) => {
            props.onChangeError!(options.onChangeError!(error), name);
          },
    [props.error, options.error],
  );
  return { error, name: props.name, onChange, onChangeError, value };
}
