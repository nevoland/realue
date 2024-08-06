import { debounce, useEffect, useMemo, useState } from "../dependencies.js";
import type {
  DebouncedFunction,
  Name,
  NevoProps,
  ValueMutator,
} from "../types";

/**
 * Debounces calls of the value mutator `onChange` while immediately updating the local `value`.
 *
 * @param props Properties according to the NEVO pattern.
 * @param delay The debounce delay in milliseconds.
 * @returns Properties according to the NEVO pattern, with `onChange` being a debounced value mutator.
 */
export function useDebounce<T>(
  props: Pick<NevoProps<T>, "value" | "name" | "onChange">,
  delay?: number,
) {
  const { 0: value, 1: onChange } = useState(props.value);
  const wrappedOnChange:
    | ValueMutator<T>
    | DebouncedFunction<ValueMutator<T>>
    | undefined = useMemo(() => {
    if (props.onChange === undefined) {
      return undefined;
    }
    if (!delay) {
      return props.onChange;
    }
    const debouncedOnChange = debounce(props.onChange, delay);
    const result = (value: T, name: Name) => {
      debouncedOnChange(value, name);
      onChange(value);
    };
    result.cancel = debouncedOnChange.cancel;
    result.flush = debouncedOnChange.flush;
    return result;
  }, [props.onChange, delay]);
  useEffect(
    () => (wrappedOnChange as DebouncedFunction<ValueMutator<T>>)?.cancel,
    [wrappedOnChange],
  );
  return {
    ...props,
    onChange: wrappedOnChange,
    value: !delay ? props.value : value,
  };
}
