import { useEffect, useMemo } from "../dependencies.js";
import type { ErrorMessage, NevoProps, ValueValidator } from "../types";

import { usePromise } from "./usePromise.js";

export function useValidator<T, N extends string>(
  props: Pick<
    NevoProps<T, N, ErrorMessage[]>,
    "name" | "error" | "value" | "onChangeError"
  >,
  onValidate?: ValueValidator<T, N>,
) {
  const { name, error, value, onChangeError } = props;
  const errorPromise = usePromise(
    useMemo(() => {
      if (onValidate === undefined || onChangeError === undefined) {
        return undefined;
      }
      return onValidate?.(value, name);
    }, [value, onValidate, onChangeError, name]),
  );
  const errorPromiseValue = errorPromise.value;
  useEffect(() => {
    if (onChangeError === undefined) {
      return;
    }
    const nextError = errorPromiseValue;
    if (isEqualError(nextError, error)) {
      return;
    }
    onChangeError(nextError, name);
  }, [errorPromiseValue]);
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
