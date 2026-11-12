/**
 * Returns the provided string `value` with its first character converted to upper case.
 *
 * @example
 * ```ts
 * capitalize("option"); // "Option"
 * ```
 *
 * @param value The string to capitalize. Must not be empty.
 * @returns The capitalized string.
 */
export function capitalize<T extends string>(value: T) {
  return `${value[0].toUpperCase()}${value.slice(1)}` as Capitalize<T>;
}
