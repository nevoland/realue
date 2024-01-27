import type { ErrorReport } from "./ErrorReport";

/**
 * Options for `useTransform`.
 */
export type UseTransformOptions<T, U> = {
  /**
   * Transform the incoming `value`.
   *
   * @param value The incoming `value` to transform.
   * @returns The transformed value.
   */
  value: (value: T) => U;
  /**
   * Transforms the outgoing `value` passed to the `onChange` callback.
   *
   * @param value The outgoing `value` to transform.
   * @returns The transformed value.
   */
  onChange: (value: U) => T;
} & (
  | {
      /**
       * Optionally transform the incoming `error`.
       *
       * @param error The incoming `error` to transform.
       * @returns The transformed error.
       */
      error: (error: ErrorReport<T> | undefined) => ErrorReport<U> | undefined;
      /**
       * Optionally transform the outgoing `error` passed to the `onChangeError` callback.
       *
       * @param error The outgoing `error` to transform.
       * @returns The transformed error.
       */
      onChangeError: (
        error: ErrorReport<U> | undefined,
      ) => ErrorReport<T> | undefined;
    }
  | {
      error?: never;
      onChangeError?: never;
    }
);
