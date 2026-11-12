import { useDelay } from "./useDelay.js";

/**
 * Alias of `useDelay`.
 *
 * @deprecated This function was renamed to `useDelay`.
 */
export const useDebounce = ((...args) => useDelay(...args)) as typeof useDelay;
