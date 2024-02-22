import type { ErrorReport } from "./ErrorReport";

export type ErrorTransformer<T, U> = (
  error: ErrorReport<T> | undefined,
) => ErrorReport<U> | undefined;
