import { type JSX, useMemo } from "../dependencies.js";
import type { NevoProps } from "../types";

/**
 * Returns an event listener that, when triggered, extracts the value from the target element and provides it to the NEVO property `onChange(value, name)`.
 *
 * @param props Properties `name` and `onChange` according to the NEVO pattern.
 * @param extractValue Callback extracting the value from the provided target element.
 * @returns Event listener.
 */
export function useInput<T>(
  props: Pick<NevoProps<T>, "name" | "value" | "onChange">,
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
