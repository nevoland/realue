import { useRef } from "../dependencies";

/**
 * Returns the provided `value` when `trigger` was truthy.
 * By default, `trigger` is `true` when `value` is not `undefined`.
 *
 * @param value The `value` to keep a non-undefined value of.
 * @param trigger The `trigger` that sets the last value if it is `truthy`.
 * @returns The last non-undefined version of the provided `value`, or `undefined`.
 */
export function useResilient<T>(
  value: T,
  trigger: boolean = value !== undefined,
): T {
  const ref = useRef(value);
  if (trigger) {
    ref.current = value;
  }
  return ref.current;
}
