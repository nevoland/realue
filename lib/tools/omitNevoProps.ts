import type { OmitNevoProps } from "../types/OmitNevoProps";

/**
 * Returns the properties without the ones according to the NEVO pattern (`name`, `error`, `value`, `onChange`, and `onChangeError`).
 *
 * @param props Properties according to the NEVO pattern with extra properties.
 * @returns The properties without the ones according to the NEVO pattern.
 */
export function omitNevoProps<P extends object>(props: P): OmitNevoProps<P> {
  const { name, error, value, onChange, onChangeError, ...otherProps } =
    props as any;
  return otherProps;
}
