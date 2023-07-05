import { memo, useCallback, useEffect, type JSX } from "../../lib/dependencies";
import { NevoProps } from "../../lib/types";

type InputProps = NevoProps<string> & {
  label?: string;
  placeholder?: string;
  onValidate?(value: string): string[] | undefined;
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
    useEffect(() => {
      if (onValidate && onChangeError) {
        onChangeError(onValidate(value), name);
      }
    }, [value]);
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
