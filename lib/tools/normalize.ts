import type { NevoProps, NevoPropsAdapted } from "../types";

import { capitalize } from "./capitalize";

/**
 * Normalizes the provided `props` from the provided `propertyName`.
 *
 * @example
 * ```tsx
 * <SomeComponent {...normalize("option", props)} />
 * ```
 *
 * @param propertyName Name of the value property.
 * @param props Propertyes according to the Nevo pattern.
 * @returns
 */
export function normalize<T, const K extends string>(
  propertyName: K,
  props: NevoPropsAdapted<T, K>,
): NevoProps<T> {
  const capitalizedPropertyName = capitalize(propertyName);
  return {
    name: props[`${propertyName}Name`],
    error: props[`${propertyName}Error`],
    value: props[propertyName],
    onChange: props[`onChange${capitalizedPropertyName}`],
    onChangeError: props[`onChange${capitalizedPropertyName}Error`],
  } as NevoProps<T>;
}
