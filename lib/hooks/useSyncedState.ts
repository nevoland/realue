import { useCallback, useEffect, useState } from "../dependencies";
import type { NevoProps } from "../types";

/**
 * Creates a state that is synced with its parent.
 * If `props.value` changes, the internal `state` is also updated.
 * Calls to `onChangeState(value)` trigger a call of `props.onChange(state, props.name)`.
 *
 * @param props The NEVO props.
 * @returns The `[state, onChangeState]` tuple.
 */
export function useSyncedState<T>(
  props: NevoProps<T>,
): [T, (value: T) => void] {
  const [state, onChangeState] = useState<T>(props.value);
  useEffect(() => onChangeState(props.value), [props.value]);
  const onChange = useCallback(
    (value: T) => {
      onChangeState(value);
      props.onChange?.(value, props.name);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onChange],
  );
  return [state, onChange];
}
