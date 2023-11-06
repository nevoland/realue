import { type JSX, useMemo } from "../dependencies.js";
import type { NevoProps } from "../types";

export function useInput<T, N extends string>(
  props: Pick<NevoProps<T, N>, "name" | "onChange">,
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
