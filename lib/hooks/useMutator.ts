import { useMemo } from "../dependencies.js";
import type { NevoProps } from "../types";

/**
 * Take an `onChange` and `name` and returns the onChange applied to the name.
 *
 * @param props The props holding the `name` and `onChange` callbacks.
 * @returns onChange callback.
 */
export function useMutator<T>(props: NevoProps<T>) {
  const { onChange, name } = props;
  return useMemo(() => {
    if (onChange === undefined) {
      return undefined;
    }
    return (value: T) => onChange(value, name);
  }, [onChange, name]);
}
