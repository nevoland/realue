import { useMemo } from "../dependencies.js";
import type { NevoProps, ValueMutatorNamed } from "../types";

/**
 * Returns a simple mutator that takes only the new `value` as argument.
 *
 * @param props Properties according to the NEVO pattern.
 * @returns Simple mutator that takes only the new `value` as argument.
 */
export function useMutator<T>(
  props: NevoProps<T>,
): ValueMutatorNamed<T> | undefined {
  const { onChange, name } = props;
  return useMemo(() => {
    if (onChange === undefined) {
      return undefined;
    }
    return (value: T) => onChange(value, name);
  }, [onChange, name]);
}
