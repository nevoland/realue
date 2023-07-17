import { isEmpty } from "./isEmpty";

export function undefinedIfEmpty<T extends object = {}>(value?: T) {
  if (isEmpty(value)) {
    return undefined;
  }
  return value;
}
