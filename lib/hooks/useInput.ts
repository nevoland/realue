import { useMemo, type JSX } from "../dependencies";
import type { NevoProps } from "../types";

export function useInput<T, N extends string>(
  { name, onChange }: Pick<NevoProps<T, N>, "name" | "onChange">,
  extractValue: (element: HTMLInputElement) => T,
) {
  return useMemo(
    () =>
      onChange === undefined
        ? undefined
        : (event: JSX.TargetedEvent<HTMLInputElement>) =>
            onChange(extractValue(event.currentTarget), name),
    [name, onChange, extractValue],
  );
}
