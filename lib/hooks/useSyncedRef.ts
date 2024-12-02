import { useRef } from "../dependencies.js";

/**
 * Returns a stable reference that is synced with the provided `value`.
 *
 * Removes the need for callbacks to be dependent on often changing values, thus avoiding frequent redefinitions.
 *
 * @param value The value to put in the reference.
 * @returns The reference set to the provided value.
 */
export function useSyncedRef<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
