import type { ErrorReport } from "./ErrorReport";

/**
 * Function that sets an `error`.
 */
export type ErrorUpdater<E extends ErrorReport<any>> = (
  error: E | undefined,
) => void;
