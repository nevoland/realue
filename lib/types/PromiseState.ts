import type { PromiseStatus } from "../dependencies";

export type PromiseState<T> = {
  value?: T;
  promise?: Promise<T | undefined>;
  status: PromiseStatus;
  reason?: Error;
};
