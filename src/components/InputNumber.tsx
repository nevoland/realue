import { memo } from "../../lib/dependencies";
import { useValidator } from "../../lib/hooks/useValidator";
import { useInput } from "../../lib/main";
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
