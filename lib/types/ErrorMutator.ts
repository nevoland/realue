import type { Name } from "./Name";

/**
 * Function that mutates an `error`. Used as the signature for the `onChangeError` callback of the NEVO pattern.
 */
export type ErrorMutator<E, N extends string = Name> = (
  error: E | undefined,
  name: N | "",
) => void;
