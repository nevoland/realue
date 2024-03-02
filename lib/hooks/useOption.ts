import { useMemo } from "../dependencies.js";
import type { NevoProps, OptionPropsAdapted } from "../types";

/**
 *
 * @param props Properties according to the Nevo pattern.
 * @param propertyName
 * @returns
 */
export function useOption<T, const K extends string>(
  props: NevoProps<T>,
  propertyName: K,
): OptionPropsAdapted<T, K> {
  const { onChange, name } = props;
  const onChangeOption = useMemo(
    () => onChange && ((value: T) => onChange!(value, name)),
    [onChange, name],
  );
  return {
    [propertyName]: props.value,
    [`onChange${`${propertyName[0].toUpperCase()}${propertyName.slice(1)}`}`]:
      onChangeOption,
  } as OptionPropsAdapted<T, K>;
}
