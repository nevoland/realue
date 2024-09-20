import { EMPTY_OBJECT, useMemo, useRef } from "../dependencies.js";
import { childrenError } from "../tools/childrenError.js";
import { globalError } from "../tools/globalError.js";
import { changeError } from "../tools.js";
import type { ErrorReportObject, NevoProps, PropertyCallable } from "../types";

/**
 * Takes an object and returns a function that generates the required props for handling an object property value.
 *
 * @param props Properties according to the NEVO pattern, where the `value` holds an object.
 * @returns The `property` function that returns the props for a specific property `name`.
 */
export function useObject<
  T extends object | undefined,
  E extends ErrorReportObject<NonNullable<T>> = ErrorReportObject<
    NonNullable<T>
  >,
>(props: NevoProps<T, E>): PropertyCallable<NonNullable<T>> {
  const { name, onChange, error, onChangeError } = props;
  const value: NonNullable<T> = props.value ?? EMPTY_OBJECT;
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
              (stateError.current = changeError(
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
          error: childrenError<NonNullable<T>>(stateError.current)?.[
            propertyName
          ],
          key: propertyName,
          name: propertyName,
          onChange: onChangeProperty,
          onChangeError: onChangePropertyError,
          value: state.current![propertyName],
        };
      }) as PropertyCallable<NonNullable<T>>,
    [onChange, onChangeError],
  );
}
