import { useRef } from "../dependencies";

/**
 * Returns the last non-undefined version of the provided `value`, or `undefined`.
 *
 * @param value The `value` to keep a non-undefined value of.
 * @returns The last non-undefined version of the provided `value`, or `undefined`.
 */
export function useResilient<T>(value: T | undefined): T | undefined {
  const ref = useRef(value);
  if (value !== undefined) {
    ref.current = value;
  }
  return ref.current;
}
