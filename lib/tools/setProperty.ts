import { EMPTY_OBJECT } from "../constants";
import { isEmpty } from "./isEmpty";

/**
 * Returns a new object with `object[key]` set to `value` if `object[key]` is strictly different from `value`. Otherwise, returns the provided `object`.
 * If `key` is `undefined`, returns the `object` untouched.
 * If `value` is `undefined`, ensures that the returned object does not contain the `key`.
 * If `object` is `nil`, it is considered as an `EMPTY_OBJECT`.
 *
 * @param object The object to update.
 * @param key The key of the object to update.
 * @param value The value to set the object key to.
 * @returns A new updated object or the same `object` if no change was necessary.
 */
export function setProperty<T extends object, K extends keyof T = keyof T>(
  object: T | undefined = EMPTY_OBJECT,
  key?: K,
  value?: T[K],
): T {
  if (key === undefined) {
    return object;
  }
  if (value === undefined) {
    if (key in object) {
      const { [key]: _, ...result } = object;
      return isEmpty(result) ? EMPTY_OBJECT : result;
    }
    return object;
  }
  if (object[key] === value) {
    return object;
  }
  return { ...object, [key]: value };
}
