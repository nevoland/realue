import type { PromiseState } from "../types";

/**
 * Returns the props with `onChange` and `onChangeError` set to `undefined` if the `condition` is `true` or is a `PromiseState` with a `pending` status, or `null` otherwise. Useful for disabling edits in some cases.
 *
 * @example
 * ```tsx
 * <>
 *   <Component {...props} {...disable(promiseState.status === "pending")} />
 *   <Component {...props} {...disable(promiseState)} />
 * </>
 * ```
 *
 * @param condition Boolean that disables changes if `true`, or `PromiseState` that disables changes if `pending`.
 * @returns The props necessary to disable changes or not.
 */
export function disable(condition?: boolean | PromiseState<unknown>) {
  if (
    condition !== undefined &&
    (typeof condition === "boolean"
      ? condition
      : condition.status === "pending")
  ) {
    return { onChange: undefined, onChangeError: undefined };
  }
  return null;
}
