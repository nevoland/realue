import { EMPTY_ARRAY, useCallback, useState } from "../dependencies.js";

/**
 * Returns a function that triggers a refresh of the element.
 *
 * @returns A function that triggers a refresh.
 */
export function useRefresh() {
  const onChange = useState(false)[1];
  return useCallback(() => onChange((value) => !value), EMPTY_ARRAY);
}
