import type { NevoProps, NevoPropsAdapted } from "../types";

import { capitalize } from "./capitalize.js";

/**
 * Normalizes the provided `props` adapted to the provided `propertyName` back into props according to the NEVO pattern.
 * The `${propertyName}Name`, `${propertyName}Error`, `${propertyName}`, `onChange${Capitalize<propertyName>}`, and `onChange${Capitalize<propertyName>}Error` props are respectively renamed to `name`, `error`, `value`, `onChange`, and `onChangeError`.
 *
 * This is the inverse of `adapt`.
 *
 * @example
 * ```tsx
 * <SomeComponent {...normalize(props, "option")} />
 * ```
 *
 * @param props Properties adapted to the `propertyName`.
 * @param propertyName Name of the value property.
 * @returns Properties according to the NEVO pattern.
 */
export function normalize<T, const K extends string>(
  props: NevoPropsAdapted<T, K>,
  propertyName: K,
): NevoProps<T> {
  const capitalizedPropertyName = capitalize(propertyName);
  return {
    error: props[`${propertyName}Error`],
    name: props[`${propertyName}Name`],
    onChange: props[`onChange${capitalizedPropertyName}`],
    onChangeError: props[`onChange${capitalizedPropertyName}Error`],
    value: props[propertyName],
  } as NevoProps<T>;
}
