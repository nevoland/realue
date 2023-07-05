import { type JSX, useCallback, memo } from "../../lib/dependencies";
import { NevoProps } from "../../lib/types";

type CheckboxProps = NevoProps<boolean> & {
  label?: string;
};

export const Checkbox = memo(
  ({ value, name, onChange, label }: CheckboxProps) => {
    const onInput = useCallback(
      (event: JSX.TargetedEvent<HTMLInputElement>) =>
        onChange?.(event.currentTarget.checked, event.currentTarget.name),
      [onChange],
    );
    return (
      <div class="flex flex-row items-center space-x-1">
        <input type="checkbox" checked={value} onChange={onInput} name={name} />
        <label>{label}</label>
      </div>
    );
  },
);
