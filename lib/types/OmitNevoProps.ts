import type { NevoName } from "./NevoName";

/**
 * Omits the properties of the NEVO pattern.
 */
export type OmitNevoProps<P> = Omit<P, NevoName>;
