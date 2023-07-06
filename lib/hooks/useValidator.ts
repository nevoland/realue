import { useEffect } from "../dependencies";
import type { ErrorMutator, ErrorReport, Name, ValueValidator } from "../types";

export function useValidator<T>(
  value: T,
  name: Name,
  onValidate?: ValueValidator<T>,
  onChangeError?: ErrorMutator<ErrorReport<T>>,
) {
  useEffect(() => {
    if (onValidate && onChangeError) {
      (async () => {
        onChangeError(await onValidate(value), name);
      })();
    }
  }, [value, onValidate, onChangeError]);
}
