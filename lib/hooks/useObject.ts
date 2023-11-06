import {
  setProperty,
  undefinedIfEmpty,
  useMemo,
  useRef,
} from "../dependencies.js";
import type {
  ErrorReportObject,
  ObjectProps,
  PropertyCallbable,
} from "../types";

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
            error: stateError.current?.[""],
            name: "",
            onChange,
            onChangeError: onChangePropertyError,
            value: state.current,
          };
        }
        return {
          error: stateError.current?.[propertyName],
          key: propertyName,
          name: propertyName,
          onChange: onChangeProperty,
          onChangeError: onChangePropertyError,
          value: state.current[propertyName],
        };
      }) as PropertyCallbable<T, N, E>,
    [onChange, onChangeError],
  );
}
