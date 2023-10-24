/**
 * Returns the necessary props to disable changes if `condition` is truthy.
 *
 * @param condition Boolean that disables changes if true.
 * @returns The props necessary to disable changes or not.
 */
export function disable(condition: boolean) {
  if (condition) {
    return { onChange: undefined };
  }
  return null;
}
