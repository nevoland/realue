import { useEffect, useMemo } from "../dependencies.js";
import type { ErrorReport, ErrorReportValue, NevoProps, ValueValidator } from "../types";

import { usePromise } from "./usePromise.js";
import { useResilient } from "./useResilient.js";

export function useValidator<T>(
  props: NevoProps<T>,
  onValidate?: ValueValidator<T>,
) {
  const { name, error, value, onChangeError } = props;
  const errorPromise = usePromise(
    useMemo(() => {
      if (onValidate === undefined || onChangeError === undefined) {
        return undefined;
      }
      return onValidate(value, name);
    }, [value, onValidate, onChangeError, name]),
  );
  const errorPromiseValue = useResilient(
    errorPromise.value,
    errorPromise.value !== undefined || errorPromise.status !== "pending",
  );
  useEffect(() => {
    if (onChangeError === undefined) {
      return;
    }
    const nextError = errorPromiseValue;
    if (isEqualError(nextError, error as ErrorReportValue)) {
      return;
    }
    onChangeError(nextError as ErrorReport<T>, name);
  }, [errorPromiseValue]);
  return errorPromise;
}

function isEqualError(a?: ErrorReportValue, b?: ErrorReportValue): boolean {
  if (a === b) {
    return true;
  }
  if (a === undefined || b === undefined || a.length !== b.length) {
    return false;
  }
  return a.every((value, index) => value === b[index]);
}
