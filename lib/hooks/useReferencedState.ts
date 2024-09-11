import { useRef, useState } from "../dependencies.js";

/**
 * Same as `useState`, but returns the value in a reference to use it in callbacks without having to regenerate them.
 *
 * @param value Initial value.
 * @returns A couple containing the reference to the current state value, and the state updater function.
 */
export function useReferencedState<T>(value: T) {
  const { 0: state, 1: onChangeState } = useState(value);
  const stateRef = useRef(state);
  stateRef.current = state;
  return [stateRef, onChangeState];
}
