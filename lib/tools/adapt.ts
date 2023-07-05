import { ErrorReport } from "../types";

export function adapt<T extends any, E extends ErrorReport<T>>({
  value,
  onChange,
  error,
  onChangeError,
}: {
  value: T;
  onChange?(value: T): void;
  error?: E;
  onChangeError?(error: E): void;
}): [T, ((value: T) => void)?, E?, ((error: E) => void)?] {
  return [value, onChange, error, onChangeError];
}
