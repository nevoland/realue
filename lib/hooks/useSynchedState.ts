import { useState, useEffect } from "../dependencies";

export function useSynchedState<T>(value: T): [T, (value: T) => void] {
  const [state, onChangeState] = useState(value);
  useEffect(() => {
    onChangeState(value);
  }, [value]);
  return [state, onChangeState];
}
