import type { ErrorReport } from "./ErrorReport";
import type { Name } from "./Name";

/**
 * Function that mutates an `error`. Used as the signature for the `onChangeError` callback of the NEVO pattern.
 */
export type ErrorMutator<T> = (
  error: ErrorReport<T> | undefined,
  name?: Name,
) => void;
