import { memo, useCallback, useEffect, type JSX } from "../../lib/dependencies";
import { useValidator } from "../../lib/hooks/useValidator";
import type { NevoProps, ValueValidator } from "../../lib/types";

type InputProps = NevoProps<string> & {
  label?: string;
  placeholder?: string;
  onValidate?: ValueValidator<string>;
};

export const Input = memo(
  ({
    value = "",
    name,
    onChange,
    label,
    placeholder,
    error,
    onChangeError,
    onValidate,
  }: InputProps) => {
    const onInput = useCallback(
      (event: JSX.TargetedEvent<HTMLInputElement>) =>
        onChange?.(event.currentTarget.value, event.currentTarget.name),
      [onChange],
    );
    useValidator(value, name, onValidate, onChangeError);
    return (
      <div class="flex flex-col space-y-1">
        <label>{label}</label>
        {error && (
          <p class="text-red-500 dark:text-red-300">{error.join(" ")}</p>
        )}
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
