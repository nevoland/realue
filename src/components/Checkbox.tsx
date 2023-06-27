import { type JSX, useCallback } from "../../lib/dependencies";

type CheckboxProps = {
  value?: boolean;
  name?: string;
  label?: string;
  onChange?(value: boolean): void;
};

export function Checkbox({ value, name, onChange, label }: CheckboxProps) {
  const onInput = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) =>
      onChange?.(event.currentTarget.checked),
    [onChange],
  );
  return (
    <div class="flex flex-row items-center space-x-1">
      <input type="checkbox" checked={value} onChange={onInput} name={name} />
      <label>{label}</label>
    </div>
  );
}
