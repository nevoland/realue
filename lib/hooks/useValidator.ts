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

/**
 * Validates the provided `value` property using the `onValidate` asynchronous callback function.
 * This function returns a promise state object that tracks the status of the validation process.
 *
 * The `onValidate` callback function is expected to return a value or a promise that resolves with one of the following:
 *   - An error value indicating that validation has failed.
 *   - `undefined` if the validation succeeds without errors.
 *
 * @param props Properties according to the NEVO pattern.
 * @param onValidate Synchronous or asynchronous value validator.
 * @returns The promise state object.
 */
export function useValidator<T, N extends string, E extends ErrorReportValue>(
  props: NevoProps<T, E>,
  onValidate?: ValueValidator<T, E>,
): PromiseState<E | undefined>;
export function useValidator<
  T extends object,
  N extends string,
  E extends ErrorReportObject<T>,
>(
  props: NevoProps<T, E>,
  onValidate?: ValueValidator<T, E>,
): PromiseState<E | undefined>;
export function useValidator<
  T extends unknown[],
  N extends string,
  E extends ErrorReportArray<T>,
>(
  props: NevoProps<T, E>,
  onValidate?: ValueValidator<T, E>,
): PromiseState<E | undefined>;
export function useValidator<T, E extends ErrorReport<any>>(
  props: NevoProps<T, E>,
  onValidate?: ValueValidator<T, E>,
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
    () => errorPromise.value !== undefined || errorPromise.status !== "pending",
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
