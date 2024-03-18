import { useDebounce, useInput, useValidator } from "../../lib/main.js";
import type {
  ErrorReportValue,
  NevoProps,
  ValueValidator,
} from "../../lib/types";
import { memo, timeout, useEffect, useState } from "../dependencies.js";

type InputProps<T extends string | undefined> = NevoProps<
  T,
  ErrorReportValue
> & {
  label?: string;
  placeholder?: string;
  delay?: number;
  onValidate?: ValueValidator<T, ErrorReportValue>;
};

function useDelay<T>(value: T, delay?: number, inputs?: any[]): T {
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

function extractValue<T extends string | undefined>({
  value,
}: HTMLInputElement) {
  return (value === "" ? undefined : value) as T;
}

export const Input = memo(function Input({
  label,
  placeholder,
  onValidate,
  delay,
  ...props
}: InputProps<string | undefined>) {
  const validator = useValidator(props, onValidate);
  const { value = "", name, onChange } = useDebounce(props, delay);
  const onInput = useInput(props, extractValue);
  const status = useDelay(validator.status, delay);
  const error = useDelay(props.error, delay);
  return (
    <div class="flex flex-col space-y-1">
      <label>{label}</label>
      {status === "pending" && <p class="text-yellow-500">Checking…</p>}
      {error && <p class="text-red-500 dark:text-red-300">{error.join(" ")}</p>}
      <input
        autoComplete="new-password"
        disabled={!onChange}
        name={name}
        onInput={onChange ? onInput : undefined}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
});
