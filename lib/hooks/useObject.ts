import { EMPTY_OBJECT, setProperty, useMemo, useRef } from "../dependencies.js";
import { globalError } from "../tools/globalError.js";
import { isArray } from "../tools/isArray.js";
import { normalizeError } from "../tools/normalizeError.js";
import { propertyError } from "../tools/propertyError.js";
import type {
  ErrorReportObject,
  ErrorReportValue,
  Name,
  ObjectProps,
  PropertyCallable,
} from "../types";

function nextError<
  T extends object | undefined,
  E extends ErrorReportObject<NonNullable<T>>,
>(
  error: E | undefined,
  itemName: keyof E | "",
  itemError: ErrorReportValue | E[keyof E] | undefined,
): E | undefined {
  if (isArray(error)) {
    if (itemName === "" || itemError === undefined) {
      return itemError as E | undefined;
    }
    return {
      "": error,
      [itemName]: itemError,
    } as E;
  }
  return normalizeError(
    setProperty(error, itemName as keyof E, itemError as any),
  ) as E | undefined;
}

/**
 * Takes an object and returns a function that generates the required props for handling an object property value.
 *
 * @param props The props holding the object `value`.
 * @returns The `property` function that returns the props for a specific property `name`.
 */
export function useObject<
  T extends object,
  N extends Name = Name,
  E extends ErrorReportObject<T> = ErrorReportObject<T>,
>(props: ObjectProps<T, E>): PropertyCallable<T, N> {
  const {
    name,
    value = EMPTY_OBJECT as T,
    onChange,
    error,
    onChangeError,
  } = props;
  const state = useRef(value);
  state.current = value;
  const stateError = useRef(error);
  stateError.current = error;
  const stateName = useRef(name);
  stateName.current = name;
  const onChangeProperty = useMemo(
    () =>
      onChange === undefined
        ? undefined
        : <K extends keyof T>(propertyValue: T[K], propertyName: K) =>
            onChange(
              (state.current = {
                ...state.current,
                [propertyName]: propertyValue,
              }),
              stateName.current,
            ),
    [onChange],
  );
  const onChangePropertyError = useMemo(
    () =>
      onChangeError === undefined
        ? undefined
        : <K extends keyof E>(
            propertyError: E[K] | undefined,
            propertyName: K,
          ): void => {
            onChangeError(
              (stateError.current = nextError(
                stateError.current,
                propertyName,
                propertyError,
              )),
              stateName.current,
            );
          },
    [onChangeError],
  );
  return useMemo(
    () =>
      (<K extends keyof T>(propertyName?: K) => {
        if (propertyName === undefined) {
          return {
            error: globalError(stateError.current),
            name: "",
            onChange,
            onChangeError: onChangePropertyError,
            value: state.current,
          };
        }
        return {
          error: propertyError<T>(stateError.current)?.[propertyName],
          key: propertyName,
          name: propertyName,
          onChange: onChangeProperty,
          onChangeError: onChangePropertyError,
          value: state.current[propertyName],
        };
      }) as PropertyCallable<T, N>,
    [onChange, onChangeError],
  );
}
