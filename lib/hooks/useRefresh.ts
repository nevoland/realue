import { EMPTY_ARRAY, useMemo, useState } from "../dependencies.js";

interface RefreshResult {
  (): void;
  value: boolean;
}

/**
 * Returns a function that triggers a refresh of the element.
 *
 * The returned function has a `value` property set to the `boolean` value that toggles between `true` and `false` to trigger the refresh. This is useful if, in addition to a refresh, the dependencies of a hook need to be refreshed as well.
 *
 * @returns A function that triggers a refresh, with the `value` property.
 */
export function useRefresh(): RefreshResult {
  const { 0: value, 1: onChange } = useState(false);
  return useMemo(
    () =>
      Object.defineProperty(() => onChange((value) => !value), "value", {
        get() {
          return value;
        },
        configurable: false,
      }),
    EMPTY_ARRAY,
  ) as RefreshResult;
}
