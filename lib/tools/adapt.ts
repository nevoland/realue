import type { NevoProps, NevoPropsAdapted } from "../types";

import { capitalize } from "./capitalize.js";

/**
 * Adapts the provided `props` to the specified `propertyName`, so that they can be spread alongside other NEVO props.
 * The `name`, `error`, `value`, `onChange`, and `onChangeError` props are respectively renamed to `${propertyName}Name`, `${propertyName}Error`, `${propertyName}`, `onChange${Capitalize<propertyName>}`, and `onChangeError${Capitalize<propertyName>}`.
 *
 * This is the inverse of `normalize`.
 *
 * @example
 * ```tsx
 * <SomeComponent {...property("value")} {...adapt(property("option"), "option")} />
 * ```
 *
 * @param props Properties according to the NEVO pattern.
 * @param propertyName Name of the value property.
 * @returns The adapted properties.
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
