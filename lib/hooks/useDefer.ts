import { delay } from "futurise";

import { useEffect, useMemo, useState } from "../dependencies.js";
import type { DelayOptions } from "../types";

/**
 * Returns a deferred version of the provided `value` by a given delay `duration`. If the `duration` is `undefined`, immediately returns the actual value.
 *
 * @param value Current value.
 * @param duration The delay at which to update the value.
 * @param options The delay options.
 * @returns The deferred value.
 */
export function useDefer<T>(
  value: T,
  duration?: number,
  options?: DelayOptions,
) {
  const [state, onChangeState] = useState<T>(value);
  const immediate = duration === undefined;
  const onChange = useMemo(() => {
    if (immediate) {
      return undefined;
    }
    return delay(duration, onChangeState, options);
  }, [duration, options?.immediate, options?.throttle]);
  useEffect(() => {
    if (immediate) {
      return;
    }
    onChange!(value);
  }, [value]);
  if (immediate) {
    return value;
  }
  return state;
}
