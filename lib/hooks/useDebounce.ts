import { useDelay } from "./useDelay.js";

/**
 * @deprecated This function was renamed to `useDelay`.
 */
export const useDebounce = ((...args) => useDelay(...args)) as typeof useDelay;
