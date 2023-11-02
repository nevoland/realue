import { useCallback, useEffect, useSignal } from "../dependencies";

export function useSyncedSignal<T>(value: T): [T, (value: T) => void] {
  const signal = useSignal(value);
  useEffect(() => {
    signal.value = value;
  }, [value]);
  return [
    signal.value,
    useCallback((value: T) => {
      signal.value = value;
    }, []),
  ];
}