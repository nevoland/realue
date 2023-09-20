import { useEffect } from "../dependencies";
import type { ErrorMessage, NevoProps, ValueValidator } from "../types";
import { usePromise } from "./usePromise";

export function useValidator<T, N extends string>(
  {
    name,
    error,
    value,
    onChangeError,
  }: Pick<
    NevoProps<T, N, ErrorMessage[]>,
    "name" | "error" | "value" | "onChangeError"
  >,
  onValidate?: ValueValidator<T>,
) {
  const errorPromise = usePromise<ErrorMessage[] | undefined>();
  useEffect(() => {
    if (onValidate === undefined || onChangeError === undefined) {
      return;
    }
    errorPromise.onChange(onValidate(value, name));
  }, [value, onValidate, onChangeError]);
  useEffect(() => {
    if (onChangeError == undefined) {
      return;
    }
    const nextError = errorPromise.value;
    if (isEqualError(nextError, error)) {
      return;
    }
    onChangeError(nextError, name);
  }, [errorPromise.value]);
  return errorPromise;
}

function isEqualError(a?: ErrorMessage[], b?: ErrorMessage[]): boolean {
  if (a === b) {
    return true;
  }
  if (a === undefined || b === undefined || a.length !== b.length) {
    return false;
  }
  return a.every((value, index) => value === b[index]);
}
