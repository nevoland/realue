export function adapt<T extends any>({
  value,
  onChange,
}: {
  value: T;
  onChange(value: T): void;
}): [T, (value: T) => void] {
  return [value, onChange];
}
