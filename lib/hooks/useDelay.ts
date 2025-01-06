import { type DelayOptions, delay } from "futurise";

import { useEffect, useMemo } from "../dependencies.js";
import type {
  DelayedFunction,
  Name,
  NevoProps,
  ValueMutator,
} from "../types.js";

import { useReferencedState } from "./useReferencedState.js";

/**
 * Delays calls of the value mutator `onChange` while immediately updating the local `value`.
 *
 * @param props Properties according to the NEVO pattern.
 * @param duration The delay duration in milliseconds.
 * @returns Properties according to the NEVO pattern, with `onChange` being a debounced value mutator.
 */
export function useDelay<T>(
  props: Pick<NevoProps<T>, "value" | "name" | "onChange">,
  duration?: number,
  options?: DelayOptions,
) {
  const { 0: state, 1: setState } = useReferencedState(props.value);
  const wrappedOnChange:
    | ValueMutator<T>
    | DelayedFunction<ValueMutator<T>>
    | undefined = useMemo(() => {
    if (props.onChange === undefined) {
      return undefined;
    }
    if (duration === undefined) {
      return props.onChange;
    }
    const delayedOnChange = delay(duration, props.onChange, options);
    return Object.defineProperties(
      (value: T, name?: Name) => {
        delayedOnChange(value, name);
        setState(value);
      },
      {
        cancel: {
          configurable: false,
          value: delayedOnChange.cancel,
        },
        flush: {
          configurable: false,
          value: delayedOnChange.flush,
        },
        pending: {
          configurable: false,
          get() {
            return delayedOnChange.pending;
          },
        },
        result: {
          configurable: false,
          get() {
            return delayedOnChange.result;
          },
        },
      },
    );
  }, [props.onChange, duration]);
  useEffect(
    () => (wrappedOnChange as DelayedFunction<ValueMutator<T>>)?.cancel,
    [wrappedOnChange],
  );
  useMemo(() => {
    state.current = props.value;
  }, [props.value]);
  return {
    ...props,
    value: !duration ? props.value : state.current,
    onChange: wrappedOnChange,
  };
}
