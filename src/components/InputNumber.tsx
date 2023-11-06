import { memo } from "../../lib/dependencies.js";
import { useValidator } from "../../lib/hooks/useValidator.js";
import { useInput } from "../../lib/main.js";
import type { NevoProps, ValueValidator } from "../../lib/types";

type InputNumberProps = NevoProps<number | undefined> & {
  label?: string;
  placeholder?: string;
  onValidate?: ValueValidator<number | undefined>;
};

function extractValue({ value }: HTMLInputElement) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? undefined : parsedValue;
}

export const InputNumber = memo(function InputNumber(props: InputNumberProps) {
  const {
    value: currentValue,
    name,
    onChange,
    label,
    placeholder,
    onValidate,
    error,
    onChangeError,
  } = props;
  const value =
    currentValue === undefined
      ? undefined
      : isNaN(currentValue)
      ? 0
      : currentValue;
  const onInput = useInput(props, extractValue);
  useValidator({ error, name, onChangeError, value }, onValidate);
  return (
    <div class="flex flex-col space-y-1">
      <label>{label}</label>
      {error && <p class="text-red-500 dark:text-red-300">{error.join(" ")}</p>}
      <input
        autoComplete="off"
        disabled={!onChange}
        name={name}
        onInput={onChange ? onInput : undefined}
        placeholder={placeholder}
        type="number"
        value={value === undefined ? "" : value}
      />
    </div>
  );
});
