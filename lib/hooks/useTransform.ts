import { useMemo } from "../dependencies.js";
import type { ErrorReport, Name, NevoProps } from "../types";

/**
 * Options for `useTransform`.
 */
type UseTransformOptions<T, U> = {
  /**
   * Transform the incoming `value`.
   *
   * @param value The incoming `value` to transform.
   * @returns The transformed value.
   */
  value: (value: T) => U;
  /**
   * Transforms the outgoing `value` provided the `onChange`.
   *
   * @param value The outgoing `value` to transform.
   * @returns The transformed value.
   */
  onChange: (value: U) => T;
};

/**
 *
 * @param props The props holding the `value` and `onChange` callbacks.
 * @param options Options for `useTransform`.
 * @returns Updated props.
 */
export function useTransform<T, U>(
  props: NevoProps<T>,
  options: UseTransformOptions<T, U>,
): NevoProps<U, Name, ErrorReport<T>> {
  const value = useMemo(() => options.value(props.value), [props.value]);
  const onChange = useMemo(
    () =>
      props.onChange === undefined
        ? undefined
        : (value: U, name: Name) => {
            props.onChange!(options.onChange(value), name);
          },
    [props.onChange],
  );
  return { ...props, onChange, value };
}
