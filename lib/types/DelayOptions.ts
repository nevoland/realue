import type { DelayOptions as DelayOptionsBase } from "../dependencies";

export type DelayOptions<T> = DelayOptionsBase & { initialValue?: T };
