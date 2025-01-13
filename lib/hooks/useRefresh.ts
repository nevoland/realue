import { EMPTY_ARRAY, useMemo, useRef, useState } from "../dependencies.js";

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
  const onRefresh = useState(false)[1];
  const value = useRef(false);
  return useMemo(
    () =>
      Object.defineProperty(
        () => onRefresh((state) => (value.current = !state)),
        "value",
        {
          get() {
            return value.current;
          },
          configurable: false,
        },
      ),
    EMPTY_ARRAY,
  ) as RefreshResult;
}
