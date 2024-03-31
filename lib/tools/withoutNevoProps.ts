import type { NevoName } from "../types";

/**
 * Returns the properties without the ones according to the Nevo pattern.
 *
 * @param props Properties according to the Nevo pattern with extra properties.
 * @returns The propterties without the ones according to the Nevo pattern.
 */
export function withoutNevoProps<P extends object>(
  props: P,
): Omit<P, NevoName> {
  const { name, error, value, onChange, onChangeError, ...otherProps } =
    props as any;
  return otherProps;
}
