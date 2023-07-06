export function omitKey<T extends object, K extends keyof T>(
  value: T | undefined,
  key: K,
) {
  if (value === undefined) {
    return undefined;
  }
  const { [key]: removed, ...rest } = value;
  return rest;
}
