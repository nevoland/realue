import type { Name } from "./Name";

/**
 * Function that changes a `value`. Used as the signature for the `onChange` callback of the NEVO pattern.
 */
export type ValueMutator<T, N extends string = Name> = (
  value: T,
  name: N,
) => void;
