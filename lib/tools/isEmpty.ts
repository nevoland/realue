export function isEmpty<T extends object = {}>(value: T) {
  if (value == null) {
    return true;
  }
  for (let name in value) {
    if (value.hasOwnProperty(name)) return false;
  }
  return true;
}
