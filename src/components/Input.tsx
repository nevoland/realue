import { useCallback, type JSX } from "../../lib/dependencies";

type InputProps = {
  value?: string;
  name?: string;
  label?: string;
  onChange?(value: string): void;
  placeholder?: string;
};

export function Input({
  value = "",
  name,
  onChange,
  label,
  placeholder,
}: InputProps) {
  const onInput = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) =>
      onChange?.(event.currentTarget.value),
    [onChange],
  );
  return (
    <div class="flex flex-col space-y-1">
      <label>{label}</label>
      <input
        value={value}
        name={name}
        onInput={onChange ? onInput : undefined}
        disabled={!onChange}
        placeholder={placeholder}
        autoComplete="new-password"
      />
    </div>
  );
}
