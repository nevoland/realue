import { type JSX, useMemo } from "../dependencies.js";
import type { Any, ErrorReport, NevoProps } from "../types";

export function useInput<T, N extends string, E extends ErrorReport<Any>>(
  props: NevoProps<T, N, E>,
  extractValue: (element: HTMLInputElement) => T,
) {
  const { name, onChange } = props;
  return useMemo(
    () =>
      onChange === undefined
        ? undefined
        : (event: JSX.TargetedEvent<HTMLInputElement>) =>
            onChange(extractValue(event.currentTarget), name),
    [name, onChange, extractValue],
  );
}
