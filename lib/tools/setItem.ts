import { EMPTY_ARRAY } from "../constants";

/**
 * Returns a new array with `array[index]` set to `value` if `array[index]` is strictly different from `value`. Otherwise, returns the provided `array`.
 * If `index` is `undefined`, a negative number, or greater than `array.length`, returns the `array` untouched.
 * If the `array` is `undefined`, it is considered as an `EMPTY_ARRAY`.
 *
 * @param array The array to update.
 * @param index The index of the item of the array to update.
 * @param value The value to set the item to.
 * @returns A new updated array or the same `array` if no change was necessary.
 */
export function setItem<T>(
  array: T[] | undefined = EMPTY_ARRAY as unknown as T[],
  index: number | undefined,
  value: T,
): T[] {
  if (index === undefined || index < 0 || index >= array.length) {
    return array;
  }
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}
