import { useRef } from "../dependencies.js";

/**
 * Returns the provided `value` when `trigger` was truthy.
 * By default, `trigger` is `true` when `value` is not `undefined`.
 *
 * @param value The `value` to make resilient.
 * @param trigger The `trigger` that sets the last value if it is `truthy`.
 * @returns The last `value` when `trigger` was `truthy`.
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
