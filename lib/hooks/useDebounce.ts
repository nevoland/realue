import { debounce, useEffect, useMemo, useState } from "../dependencies";
import type { DebouncedFunction, NevoProps, ValueMutator } from "../types";

export function useDebounce<T, N extends string, E>(
  props: NevoProps<T, N, E>,
  delay?: number,
) {
  const { 0: value, 1: onChange } = useState(props.value);
  const wrappedOnChange:
    | ValueMutator<T, N>
    | DebouncedFunction<ValueMutator<T, N>>
    | undefined = useMemo(() => {
    if (props.onChange === undefined) {
      return undefined;
    }
    if (!delay) {
      return props.onChange;
    }
    const debouncedOnChange = debounce(props.onChange, delay);
    const result = (value: T, name: N) => {
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
    value: !delay ? props.value : value,
    onChange: wrappedOnChange,
  };
}
