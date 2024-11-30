import type { Ref, RefCallback } from "../dependencies/types";
import { useMemo } from "../dependencies.js";

/**
 * Combines a list of refs into a single callable ref, updating the list of refs to the value it is called with.
 *
 * @param refList The list of refs to combine.
 * @returns Callable ref that updates the list of refs to the value it is called with.
 */
export function useRefList<T>(
  ...refList: Array<Ref<T> | undefined>
): RefCallback<T> | null {
  return useMemo(() => {
    if (refList.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      const { length } = refList;
      for (let i = 0; i < length; i++) {
        const ref = refList[i];
        if (ref == null) {
          continue;
        }
        if (typeof ref === "function") {
          ref(value);
          continue;
        }
        ref.current = value;
      }
    };
  }, refList);
}
