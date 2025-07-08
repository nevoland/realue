import type { OmitNevoProps } from "../types/OmitNevoProps";

/**
 * Returns the properties without the ones according to the Nevo pattern.
 *
 * @param props Properties according to the Nevo pattern with extra properties.
 * @returns The propterties without the ones according to the Nevo pattern.
 */
export function omitNevoProps<P extends object>(props: P): OmitNevoProps<P> {
  const { name, error, value, onChange, onChangeError, ...otherProps } =
    props as any;
  return otherProps;
}
