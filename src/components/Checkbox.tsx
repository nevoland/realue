import { type JSX, useCallback, memo, useId } from "../../lib/dependencies";
import { NevoProps } from "../../lib/types";

type CheckboxProps = NevoProps<boolean> & {
  label?: string;
};

export const Checkbox = memo(function Checkbox({
  value,
  name,
  onChange,
  label,
}: CheckboxProps) {
  const onInput = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) =>
      onChange?.(event.currentTarget.checked, event.currentTarget.name),
    [onChange],
  );
  const id = useId();
  return (
    <div class="flex flex-row items-center space-x-1">
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={onInput}
        name={name}
      />
      <label for={id}>{label}</label>
    </div>
  );
});
