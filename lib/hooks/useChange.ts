import { identity, useMemo } from "../dependencies.js";
import type { NevoProps } from "../types";

/**
 * Returns a callback that, when called, calls `onChange(transformValue(value), name)`, or `undefined` if `onChange` is not set.
 *
 * @deprecated Use `useInput` instead.
 *
 * @param props Properties `value`, `name`, and `onChange` according to the NEVO pattern.
 * @param transformValue Optional function that transforms the `value` before passing it to `onChange`. Defaults to the identity function.
 * @returns A callback that calls `onChange` with the transformed `value` and the `name`.
 */
export function useChange<T>(
  props: Pick<NevoProps<T>, "value" | "name" | "onChange">,
  transformValue: (value: T) => T = identity,
) {
  const { value, name, onChange } = props;
  return useMemo(
    () =>
      onChange === undefined
        ? undefined
        : () => onChange(transformValue(value), name),
    [value, name, onChange, transformValue],
  );
}
