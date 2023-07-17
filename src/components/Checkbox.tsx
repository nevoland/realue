import { ChangeEventHandler } from "react";
import { JSX, useCallback, memo, useId } from "../../lib/dependencies";
import { NevoProps } from "../../lib/types";

type CheckboxProps = NevoProps<boolean> & {
  label?: string;
};

export const Checkbox = memo(
  ({ value, name, onChange, label }: CheckboxProps) => {
    const onInput = useCallback(
      (event: JSX.ChangeEvent<HTMLInputElement>) =>
        onChange?.(event.target.checked, event.target.name),
      [onChange],
    );
    const id = useId();
    return (
      <div className="flex flex-row items-center space-x-1">
        <input
          id={id}
          type="checkbox"
          checked={value}
          onChange={onInput}
          name={name}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  },
);
