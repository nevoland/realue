import { useRef } from "../dependencies";

/**
 * Returns the last non-undefined version of the provided `value` or when `trigger` was truthy, or `undefined`.
 *
 * @param value The `value` to keep a non-undefined value of.
 * @param trigger An optional `trigger` that sets the last value if it is `truthy`.
 * @returns The last non-undefined version of the provided `value`, or `undefined`.
 */
export function useResilient<T>(
  value: T | undefined,
  trigger?: boolean,
): T | undefined {
  const ref = useRef(value);
  if ((value !== undefined && trigger === undefined) || trigger) {
    ref.current = value;
  }
  return ref.current;
}
