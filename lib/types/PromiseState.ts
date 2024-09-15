export type PromiseState<T, E = unknown> =
  | {
      status: "idle";
      promise?: Promise<undefined>;
      value?: undefined;
      reason?: undefined;
    }
  | {
      status: "pending";
      promise: Promise<T>;
      value?: undefined;
      reason?: undefined;
    }
  | {
      status: "fulfilled";
      promise: Promise<T>;
      value: T;
      reason?: undefined;
    }
  | {
      status: "rejected";
      promise: Promise<T>;
      value?: undefined;
      reason: E;
    };
