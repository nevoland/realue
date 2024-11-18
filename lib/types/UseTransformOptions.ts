import type { ErrorTransformer } from "./ErrorTransformer";
import type { ValueTransformer } from "./ValueTransformer";

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
  value: ValueTransformer<T, U>;
  /**
   * Transforms the outgoing `value` passed to the `onChange` callback.
   *
   * @param value The outgoing `value` to transform.
   * @returns The transformed value.
   */
  onChange: ValueTransformer<U, T>;
  /**
   * If `true`, caches the latest transforms from `value` and `onChange` and returns them if identical values are presented.
   *
   * ⚠️ Only enable the cache if the `value(value)` transform is bijective and `onChange(value)` is the complete inverse function, i.e., `value(onChange(data))` deeply equals `data`.
   */
  cache?: boolean;
} & (
  | {
      /**
       * Optionally transform the incoming `error`.
       *
       * @param error The incoming `error` to transform.
       * @returns The transformed error.
       */
      error: ErrorTransformer<T, U>;
      /**
       * Optionally transform the outgoing `error` passed to the `onChangeError` callback.
       *
       * @param error The outgoing `error` to transform.
       * @returns The transformed error.
       */
      onChangeError: ErrorTransformer<U, T>;
    }
  | {
      error?: never;
      onChangeError?: never;
    }
);
