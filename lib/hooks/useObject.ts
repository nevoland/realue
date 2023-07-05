import { useRef, useCallback, useMemo } from "../dependencies";
import type { ErrorReport, ErrorReportObject, Name } from "../types";

interface PropertyCallbable<T extends object, E extends ErrorReportObject<T>> {
  <K extends keyof T>(propertyName: K): {
    value: T[K];
    name: K;
    key: K;
    onChange: ((propertyValue: T[K]) => void) | undefined;
    error:
      | Partial<{ [K in keyof T]: ErrorReport<T[K], NonNullable<T[K]>> }>[K]
      | undefined;
    onChangeError: ((propertyError: E["property"][K]) => void) | undefined;
  };
  parent: T;
}

type ObjectProps<T, E> = {
  name: Name;
  value?: T;
  onChange?: (value: T, name: Name) => void;
  error?: E;
  onChangeError?: (error: E, name: Name) => void;
};

export function useObject<T extends object, E extends ErrorReportObject<T>>({
  name,
  value = {} as T,
  onChange,
  error,
  onChangeError,
}: ObjectProps<T, E>): PropertyCallbable<T, E> {
  const state = useRef(value);
  state.current = value;
  const stateError = useRef(error);
  stateError.current = error;
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
              name,
            ),
    [onChange, name],
  );
  const onChangePropertyError = useMemo(
    () =>
      onChangeError === undefined
        ? undefined
        : <K extends keyof T>(
            propertyError: E["property"][K] | undefined,
            propertyName: Name,
          ): void => {
            onChangeError(
              (stateError.current = {
                ...(stateError.current ?? null),
                property: {
                  ...(stateError.current?.property ?? null),
                  [propertyName]: propertyError,
                },
              } as E),
              name,
            );
          },
    [onChangeError],
  );
  return useCallback(
    Object.defineProperty(
      <K extends keyof T>(propertyName: K) => {
        return {
          value: state.current[propertyName],
          name: propertyName,
          key: propertyName,
          onChange: onChangeProperty,
          error: stateError.current?.property[propertyName],
          onChangeError: onChangePropertyError,
        };
      },
      "parent",
      {
        configurable: false,
        enumerable: false,
        get() {
          return state.current;
        },
      },
    ) as PropertyCallbable<T, E>,
    [onChange, onChangeError],
  );
}
