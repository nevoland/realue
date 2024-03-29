import type { NevoProps, NevoPropsAdapted } from "../types";

import { capitalize } from "./capitalize.js";

/**
 * Normalizes the provided `props` from the provided `propertyName`.
 *
 * @example
 * ```tsx
 * <SomeComponent {...normalize("option", props)} />
 * ```
 *
 * @param props Propertyes according to the Nevo pattern.
 * @param propertyName Name of the value property.
 * @returns
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
