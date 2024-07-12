import { useMemo } from "../dependencies.js";
import type { NevoProps, OptionPropsAdapted } from "../types";

/**
 * Renames the `value` prop to `${optionName}`, and renames the `onChange` prop to `onChange${capitalized(optionName)}` while transforming it into a simple mutator that takes only the new `value` as argument.
 *
 * @param props Properties according to the NEVO pattern.
 * @param optionName The name to use for the option.
 * @returns Properties `${optionName}` and `onChange${capitalized(optionName)}`.
 */
export function useOption<T, const K extends string>(
  props: Pick<NevoProps<T>, "name" | "value" | "onChange">,
  optionName: K,
): OptionPropsAdapted<T, K> {
  const { onChange, name } = props;
  const onChangeOption = useMemo(
    () => onChange && ((value: T) => onChange!(value, name)),
    [onChange, name],
  );
  return {
    [optionName]: props.value,
    [`onChange${`${optionName[0].toUpperCase()}${optionName.slice(1)}`}`]:
      onChangeOption,
  } as OptionPropsAdapted<T, K>;
}
