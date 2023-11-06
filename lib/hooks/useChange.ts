import { identity, useMemo } from "../dependencies.js";
import type { NevoProps } from "../types";

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
