import { memo, useCallback, type JSX } from "../../lib/dependencies";
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
      (event: JSX.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        onChange?.(value === "" ? undefined : value, event.currentTarget.name);
      },
      [onChange],
    );
    const validator = useValidator(
      { name, error, value, onChangeError },
      onValidate,
    );
    return (
      <div className="flex flex-col space-y-1">
        <label>{label}</label>
        {!validator.done && <p className="text-yellow-400">Checking…</p>}
        {error && (
          <p className="text-red-500 dark:text-red-300">{error.join(" ")}</p>
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
