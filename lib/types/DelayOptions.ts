import type { DelayOptions as DelayOptionsBase } from "../dependencies/types";

export type DelayOptions<T> = DelayOptionsBase & { initialValue?: T };
