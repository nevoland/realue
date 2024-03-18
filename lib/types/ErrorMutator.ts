import type { Any } from "./Any";
import type { ErrorReport } from "./ErrorReport";
import type { Name } from "./Name";

/**
 * Function that mutates an `error`. Used as the signature for the `onChangeError` callback of the NEVO pattern.
 */
export type ErrorMutator<E extends ErrorReport<Any>> = (
  error: E | undefined,
  name: Name,
) => void;
