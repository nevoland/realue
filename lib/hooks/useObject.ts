import { useRef, useMemo } from "../dependencies";
import { undefinedIfEmpty } from "../tools/undefinedIfEmpty";

import type {
  ErrorReportObject,
  ObjectProps,
  PropertyCallbable,
} from "../types";

import { setProperty } from "../tools/setProperty";
/**
 * Takes an object and returns a function that generates the required props for handling an object property value.
 */
export function useObject<
  T extends object,
  N extends string,
  E extends ErrorReportObject<T>,
>(props: ObjectProps<T, E>): PropertyCallbable<T, N, E> {
  const { name, value = {} as T, onChange, error, onChangeError } = props;
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
        : <K extends keyof T>(
            propertyError: E[K] | undefined,
            propertyName: K,
          ): void => {
            onChangeError(
              (stateError.current = undefinedIfEmpty(
                setProperty(stateError.current, propertyName, propertyError),
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
            value: state.current,
            name: "",
            onChange,
            error: stateError.current?.[""],
            onChangeError: onChangePropertyError,
          };
        }
        return {
          value: state.current[propertyName],
          name: propertyName,
          key: propertyName,
          onChange: onChangeProperty,
          error: stateError.current?.[propertyName],
          onChangeError: onChangePropertyError,
        };
      }) as PropertyCallbable<T, N, E>,
    [onChange, onChangeError],
  );
}
