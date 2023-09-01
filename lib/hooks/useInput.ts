import { useMemo, type JSX } from "../dependencies";
import type { NevoProps } from "../types";

export function useInput<T>(
  { name, onChange }: Pick<NevoProps<T>, "name" | "onChange">,
  extractValue: (element: HTMLInputElement) => T | undefined,
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
