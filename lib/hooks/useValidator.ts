import { useEffect, useMemo } from "../dependencies.js";
import { isEqualError } from "../tools/isEqualError.js";
import type {
  ErrorReport,
  ErrorReportArray,
  ErrorReportObject,
  ErrorReportValue,
  NevoProps,
  PromiseState,
  ValueValidator,
} from "../types";

import { usePromise } from "./usePromise.js";
import { useResilient } from "./useResilient.js";

export function useValidator<T, N extends string, E extends ErrorReportValue>(
  props: NevoProps<T, N, E>,
  onValidate?: ValueValidator<T, N, E>,
): PromiseState<E | undefined>;
export function useValidator<
  T extends object,
  N extends string,
  E extends ErrorReportObject<T>,
>(
  props: NevoProps<T, N, E>,
  onValidate?: ValueValidator<T, N, E>,
): PromiseState<E | undefined>;
export function useValidator<
  T extends unknown[],
  N extends string,
  E extends ErrorReportArray<T>,
>(
  props: NevoProps<T, N, E>,
  onValidate?: ValueValidator<T, N, E>,
): PromiseState<E | undefined>;
export function useValidator<T, N extends string, E extends ErrorReport<T>>(
  props: NevoProps<T, N, E>,
  onValidate?: ValueValidator<T, N, E>,
): PromiseState<E | undefined> {
  const { name, error, value, onChangeError } = props;
  const errorPromise = usePromise(
    useMemo(() => {
      if (onValidate === undefined || onChangeError === undefined) {
        return undefined;
      }
      return onValidate(value, name, error);
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
    if (isEqualError(nextError, error)) {
      return;
    }
    onChangeError(nextError, name);
  }, [errorPromiseValue]);
  return errorPromise;
}
