import { type JSX, useMemo } from "../dependencies.js";
import type { ErrorReport, NevoProps } from "../types";

export function useInput<T, E extends ErrorReport<any>>(
  props: NevoProps<T, E>,
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
