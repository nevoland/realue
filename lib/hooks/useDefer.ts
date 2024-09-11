import { delay } from "futurise";

import { useEffect, useMemo, useState } from "../dependencies.js";
import type { DelayOptions } from "../types";

/**
 * Returns a deferred version of the provided `value` by a given delay `duration`. If the `duration` is `undefined`, immediately returns the actual value.
 * Changes to the `duration` or the delay `options` will cancel the delayed invocation, if any, and call it again with the new parameters.
 *
 * @param value Current value.
 * @param duration The delay at which to update the value.
 * @param options The delay options.
 * @returns The deferred value.
 */
export function useDefer<T>(
  value: T,
  duration?: number,
  options?: DelayOptions<T>,
) {
  const { 0: state, 1: onChangeState } = useState<T>(
    options !== undefined && "initialValue" in options
      ? options.initialValue!
      : value,
  );
  const immediate = duration === undefined;
  const onChange = useMemo(() => {
    if (immediate) {
      return undefined;
    }
    return delay(duration, onChangeState, options);
  }, [duration, options?.immediate, options?.throttle]);
  useEffect(() => onChange?.cancel, [onChange]);
  useEffect(() => {
    if (immediate) {
      return;
    }
    onChange!(value);
  }, [value, onChange]);
  if (immediate) {
    return value;
  }
  return state;
}
