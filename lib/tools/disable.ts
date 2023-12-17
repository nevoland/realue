import type { NevoProps } from "../types";

/**
 * Updates the props following the NEVO pattern by removing the callbacks to disable changes if `condition` is truthy.
 *
 * @param props Props following the NEVO pattern.
 * @param condition Boolean that disables changes if true.
 * @returns The props necessary to disable changes or not.
 */
export function disable<T>(props: NevoProps<T>, condition: boolean) {
  if (condition) {
    return { ...props, onChange: undefined, onChangeError: undefined };
  }
  return props;
}
