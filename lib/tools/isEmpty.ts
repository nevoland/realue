import { EMPTY_OBJECT } from "../constants";

export function isEmpty<T extends object = {}>(value?: T) {
  if (value == null || value === EMPTY_OBJECT) {
    return true;
  }
  for (let name in value) {
    if (value.hasOwnProperty(name)) return false;
  }
  return true;
}
