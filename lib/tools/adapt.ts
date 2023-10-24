import type { NevoProps, NevoPropsAdapted } from "../types";

import { capitalize } from "./capitalize";

/**
 * Adapts the provided `props` to the specified `propertyName`.
 *
 * @example
 * ```tsx
 * <SomeComponent value="example" {...adapt("option", property("option"))} />
 * ```
 *
 * @param propertyName Name of the value property.
 * @param props Propertyes according to the Nevo pattern.
 * @returns
 */
export function adapt<T, const K extends string>(
  propertyName: K,
  props: NevoProps<T>,
): NevoPropsAdapted<T, K> {
  const capitalizedPropertyName = capitalize(propertyName);
  return {
    [propertyName]: props.value,
    [`onChange${capitalizedPropertyName}`]:
      props.onChange && ((value: T) => props.onChange!(value, props.name)),
    [`${propertyName}Error`]: props.error,
    [`onChangeError${capitalizedPropertyName}`]:
      props.onChangeError &&
      ((error: typeof props.error) => props.onChangeError!(error, props.name)),
  } as NevoPropsAdapted<T, K>;
}
