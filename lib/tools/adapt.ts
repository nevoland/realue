import type { NevoProps, NevoPropsAdapted } from "../types";

import { capitalize } from "./capitalize.js";

/**
 * Adapts the provided `props` to the specified `propertyName`.
 *
 * @example
 * ```tsx
 * <SomeComponent {...property("value")} {...adapt(property("option"), "option")} />
 * ```
 *
 * @param props Properties according to the Nevo pattern.
 * @param propertyName Name of the value property.
 * @returns
 */
export function adapt<T, const K extends string>(
  props: NevoProps<T>,
  propertyName: K,
): NevoPropsAdapted<T, K> {
  const capitalizedPropertyName = capitalize(propertyName);
  return {
    [`${propertyName}Name`]: props.name,
    [`${propertyName}Error`]: props.error,
    [propertyName]: props.value,
    [`onChange${capitalizedPropertyName}`]: props.onChange,
    [`onChangeError${capitalizedPropertyName}`]: props.onChangeError,
  } as NevoPropsAdapted<T, K>;
}
