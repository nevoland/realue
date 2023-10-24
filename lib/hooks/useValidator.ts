import { useEffect } from "../dependencies";
import type { ErrorMessage, NevoProps, ValueValidator } from "../types";

import { usePromise } from "./usePromise";

export function useValidator<T, N extends string>(
  props: Pick<
    NevoProps<T, N, ErrorMessage[]>,
    "name" | "error" | "value" | "onChangeError"
  >,
  onValidate?: ValueValidator<T, N>,
) {
  const { name, error, value, onChangeError } = props;
  const errorPromise = usePromise<ErrorMessage[] | undefined>();
  useEffect(() => {
    if (onValidate === undefined || onChangeError === undefined) {
      return;
    }
    errorPromise.onChange(onValidate(value, name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, onValidate, onChangeError]);
  useEffect(() => {
    if (onChangeError === undefined) {
      return;
    }
    const nextError = errorPromise.value;
    if (isEqualError(nextError, error)) {
      return;
    }
    onChangeError(nextError, name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
