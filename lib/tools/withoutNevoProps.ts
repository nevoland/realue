import type { NevoName, NevoProps } from "../types";

/**
 * Returns the properties without the ones according to the Nevo pattern.
 *
 * @param props Properties according to the Nevo pattern with extra properties.
 * @returns The propterties without the ones according to the Nevo pattern.
 */
export function withoutNevoProps<T, P extends NevoProps<T>>(
  props: P,
): Omit<P, NevoName> {
  const { name, error, value, onChange, onChangeError, ...otherProps } = props;
  return otherProps;
}
