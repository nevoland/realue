import type { PromiseState } from "../types";

/**
 * Returns the props with `onChange` and `onChangeError` the `condition` is truthy. Useful for disabling edits in some cases.
 *
 * @example
 * ```tsx
 * <>
 *   <Component {...props} {...disable(promiseState.status === "pending")} />
 *   <Component {...props} {...disable(promiseState)} />
 * </>
 * ```
 *
 * @param condition Boolean that disables changes if true, or `PromiseState`
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
