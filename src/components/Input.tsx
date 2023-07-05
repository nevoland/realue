import { memo, useCallback, type JSX } from "../../lib/dependencies";
import { NevoProps } from "../../lib/types";

type InputProps = NevoProps<string> & {
  label?: string;
  placeholder?: string;
};

export const Input = memo(
  ({ value = "", name, onChange, label, placeholder }: InputProps) => {
    const onInput = useCallback(
      (event: JSX.TargetedEvent<HTMLInputElement>) =>
        onChange?.(event.currentTarget.value, event.currentTarget.name),
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
  },
);
