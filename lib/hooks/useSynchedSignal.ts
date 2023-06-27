import { useSignal, useEffect, useCallback } from "../dependencies";

export function useSynchedSignal<T>(value: T): [T, (value: T) => void] {
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
