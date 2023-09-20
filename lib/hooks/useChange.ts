import { useMemo, identity } from "../dependencies";
import type { NevoProps } from "../types";

export function useChange<T>(
  { value, name, onChange }: Pick<NevoProps<T>, "value" | "name" | "onChange">,
  transformValue: (value: T) => T = identity,
) {
  return useMemo(
    () =>
      onChange === undefined
        ? undefined
        : () => onChange(transformValue(value), name),
    [value, name, onChange, transformValue],
  );
}
