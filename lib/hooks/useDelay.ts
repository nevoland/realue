import { type DelayOptions, delay } from "futurise";

import { useLayoutEffect, useMemo } from "../dependencies.js";
import type { MaybeDelayedFunction } from "../types/MaybeDelayedFunction.js";
import type { Name, NevoProps, ValueMutator } from "../types.js";

import { useReferencedState } from "./useReferencedState.js";

/**
 * Delays calls of the value mutator `onChange` while immediately updating the local `value`.
 *
 * If `onChange` changes while a delayed call is pending, the pending call will be canceled to avoid calling the outdated `onChange`. Therefore, it is important to ensure that the `onChange` function is stable (e.g., by using `useCallback`) when using this hook to prevent unintended cancellations.
 *
 * @param props - Properties according to the NEVO pattern.
 * @param duration - The delay duration in milliseconds.
 * @param options - Optional configuration for the delay behavior. See {@link DelayOptions} for details.
 * @returns Properties according to the NEVO pattern, with `onChange` being a debounced value mutator.
 */
export function useDelay<T>(
  props: Pick<NevoProps<T>, "value" | "name" | "onChange">,
  duration?: number,
  options?: DelayOptions,
): {
  value: T;
  name?: Name;
  onChange?: MaybeDelayedFunction<ValueMutator<T>>;
} {
  const { 0: state, 1: setState } = useReferencedState(props.value);

  const wrappedOnChange: MaybeDelayedFunction<ValueMutator<T>> | undefined =
    useMemo(() => {
      if (props.onChange === undefined) {
        return undefined;
      }
      if (duration === undefined) {
        // Note that this could be already a delayed function
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
    }, [props.onChange, duration, options?.immediate, options?.throttle]);

  useLayoutEffect(
    () => () => {
      if (duration === undefined) {
        return;
      }
      wrappedOnChange?.cancel?.();
    },
    [wrappedOnChange],
  );

  useMemo(
    () => {
      if (duration !== undefined && wrappedOnChange?.pending) {
        return;
      }
      state.current = props.value;
    },
    // Intentionally not including `wrappedOnChange` here as only value changes should trigger this effect
    [props.value],
  );

  return {
    ...props,
    value: state.current,
    onChange: wrappedOnChange,
  };
}
