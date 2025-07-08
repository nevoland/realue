import type { NevoName } from "./NevoName";

export type OmitNevoProps<P> = Omit<P, NevoName>;
