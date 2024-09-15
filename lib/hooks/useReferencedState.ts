import {
  EMPTY_ARRAY,
  type StateUpdater,
  useCallback,
  useRef,
  useState,
} from "../dependencies.js";

/**
 * Same as `useState`, but returns the value in a reference to use it in callbacks without having to regenerate them.
 *
 * @param value Initial value.
 * @returns A couple containing the reference to the current state value, and the state updater function.
 */
export function useReferencedState<T>(value: T) {
  const { 0: state, 1: onChangeState } = useState(value);
  const stateRef = useRef(state);
  const onChangeStateRef = useCallback((value: StateUpdater<T>) => {
    onChangeState(value);
    stateRef.current =
      typeof value === "function" ? (value as any)(stateRef.current) : value;
  }, EMPTY_ARRAY);
  stateRef.current = state;
  return [stateRef, onChangeStateRef] as const;
}
