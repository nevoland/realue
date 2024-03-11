/**
 * Returns the props with `onChange` and `onChangeError` the `condition` is truthy. Useful for disabling edits in some cases.
 *
 * @example
 * ```tsx
 * <Component {...props} {...disable(status === "pending")} />
 * ```
 *
 * @param condition Boolean that disables changes if true.
 * @returns The props necessary to disable changes or not.
 */
export function disable(condition: boolean) {
  if (condition) {
    return { onChange: undefined, onChangeError: undefined };
  }
  return null;
}
