import { useCallback, type JSX } from "../../lib/dependencies";

type InputNumberProps = {
  value?: number;
  name?: string;
  label?: string;
  onChange?(value: number): void;
  placeholder?: string;
};

export function InputNumber({
  value = 0,
  name,
  onChange,
  label,
  placeholder,
}: InputNumberProps) {
  const onInput = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) =>
      onChange?.(parseFloat(event.currentTarget.value)),
    [onChange],
  );
  return (
    <div class="flex flex-col space-y-1">
      <label>{label}</label>
      <input
        value={value}
        name={name}
        type="number"
        onInput={onChange ? onInput : undefined}
        disabled={!onChange}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
}
