import { DebouncedFunc } from "lodash-es";
import { debounce, useEffect, useMemo, useState } from "../dependencies";
import type { Name, NevoProps, ValueMutator } from "../types";

export function useDebounce<T, E>(props: NevoProps<T, E>, delay?: number) {
  const { 0: value, 1: onChange } = useState(props.value);
  const wrappedOnChange:
    | ValueMutator<T>
    | DebouncedFunc<ValueMutator<T>>
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
    () => (wrappedOnChange as DebouncedFunc<ValueMutator<T>>)?.cancel,
    [wrappedOnChange],
  );
  return {
    ...props,
    value: !delay ? props.value : value,
    onChange: wrappedOnChange,
  };
}
