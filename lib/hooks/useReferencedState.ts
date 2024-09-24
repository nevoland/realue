import {
  type Dispatch,
  EMPTY_ARRAY,
  type MutableRef,
  type StateUpdater,
  useCallback,
  useRef,
  useState,
} from "../dependencies.js";

type ReferenceStateResult<T> = readonly [
  MutableRef<T>,
  Dispatch<StateUpdater<T>>,
];

/**
 * Same as `useState`, but returns the value in a reference to use it in callbacks without having to regenerate them.
 *
 * @param value Initial value.
 * @returns A couple containing the reference to the current state value, and the state updater function.
 */
export function useReferencedState<T>(value: T): ReferenceStateResult<T>;
export function useReferencedState<T = undefined>(): ReferenceStateResult<
  T | undefined
>;
export function useReferencedState<T>(
  value?: T,
): ReferenceStateResult<T | undefined> {
  const { 0: state, 1: setState } = useState(value);
  const stateRef = useRef(state);
  const onChangeStateRef = useCallback<Dispatch<StateUpdater<T | undefined>>>(
    (value) => {
      setState(value);
      stateRef.current =
        typeof value === "function" ? (value as any)(stateRef.current) : value;
    },
    EMPTY_ARRAY,
  );
  stateRef.current = state;
  return [stateRef, onChangeStateRef];
}
