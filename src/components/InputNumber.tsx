import { memo, useCallback, type JSX } from "../../lib/dependencies";
import { useValidator } from "../../lib/hooks/useValidator";
import type { NevoProps, ValueValidator } from "../../lib/types";

type InputNumberProps = NevoProps<number> & {
  label?: string;
  placeholder?: string;
  onValidate?: ValueValidator<number>;
};

export const InputNumber = memo(function InputNumber({
  value: currentValue,
  name,
  onChange,
  label,
  placeholder,
  onValidate,
  error,
  onChangeError,
}: InputNumberProps) {
  const value =
    currentValue === undefined
      ? undefined
      : isNaN(currentValue)
      ? 0
      : currentValue;
  const onInput = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      const parsedValue = parseFloat(event.currentTarget.value);
      onChange?.(
        isNaN(parsedValue) ? undefined : parsedValue,
        event.currentTarget.name,
      );
    },
    [onChange],
  );
  useValidator({ name, error, value, onChangeError }, onValidate);
  return (
    <div class="flex flex-col space-y-1">
      <label>{label}</label>
      {error && <p class="text-red-500 dark:text-red-300">{error.join(" ")}</p>}
      <input
        value={value === undefined ? "" : value}
        name={name}
        type="number"
        onInput={onChange ? onInput : undefined}
        disabled={!onChange}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
});
