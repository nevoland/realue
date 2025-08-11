import type { DelayedFunction } from "../dependencies/types";

export type MaybeDelayedFunction<F extends (...args: any[]) => any> = F &
  Partial<Pick<DelayedFunction<F>, "cancel" | "flush" | "pending" | "result">>;
