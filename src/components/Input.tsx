import { useDefer, useDelay, useInput, useValidator } from "../../lib/main.js";
import type {
  ErrorReportValue,
  NevoProps,
  ValueValidator,
} from "../../lib/types";
import { memo } from "../dependencies.js";

type InputProps<T extends string | undefined> = NevoProps<
  T,
  ErrorReportValue
> & {
  label?: string;
  placeholder?: string;
  delay?: number;
  onValidate?: ValueValidator<T, ErrorReportValue>;
};

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
  const inputProps = useDelay(props, delay);
  const onInput = useInput(inputProps, extractValue);

  const status = useDefer(validator.status, delay);
  const error = useDefer(props.error, delay);

  return (
    <div class="flex flex-col space-y-1">
      <label>{label}</label>
      {status === "pending" && <p class="text-yellow-500">Checking…</p>}
      {error && <p class="text-red-500 dark:text-red-300">{error.join(" ")}</p>}
      <input
        autoComplete="new-password"
        disabled={onInput === undefined}
        name={inputProps.name}
        onInput={onInput}
        placeholder={placeholder}
        value={inputProps.value}
      />
    </div>
  );
});
