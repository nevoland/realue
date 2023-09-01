import {
  memo,
  useCallback,
  type JSX,
  useState,
  useEffect,
} from "../../lib/dependencies";
import { timeout, useDebounce, useValidator } from "../../lib/main";
import type { NevoProps, ValueValidator } from "../../lib/types";

type InputProps = NevoProps<string> & {
  label?: string;
  placeholder?: string;
  delay?: number;
  onValidate?: ValueValidator<string>;
};

function useDelay(value: any, delay?: number, inputs?: any[]) {
  const { 0: state, 1: onChangeState } = useState(value);
  useEffect(() => {
    if (!delay) {
      onChangeState(value);
      return;
    }
    return timeout(delay, () => onChangeState(value));
  }, [value]);
  useEffect(
    () => {
      onChangeState(value);
    },
    inputs === undefined ? [] : inputs,
  );
  return state;
}

export const Input = memo(function Input({
  label,
  placeholder,
  onValidate,
  delay,
  ...props
}: InputProps) {
  const validator = useValidator(props, onValidate);
  const { value = "", name, onChange } = useDebounce(props, delay);
  const onInput = useCallback(
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      onChange?.(value === "" ? undefined : value, event.currentTarget.name);
    },
    [onChange],
  );
  const status = useDelay(validator.status, delay);
  const error = useDelay(props.error, delay);
  return (
    <div class="flex flex-col space-y-1">
      <label>{label}</label>
      {status === "pending" && <p class="text-yellow-500">Checking…</p>}
      {error && <p class="text-red-500 dark:text-red-300">{error.join(" ")}</p>}
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
});
