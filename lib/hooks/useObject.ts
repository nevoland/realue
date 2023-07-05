import { useRef, useCallback } from "../dependencies";
import type { ErrorReport, ErrorReportObject } from "../types";

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
  value?: T;
  onChange?: (value: T) => void;
  error?: E;
  onChangeError?: (error: E) => void;
};

export function useObject<T extends object, E extends ErrorReportObject<T>>({
  value = {} as T,
  onChange,
  error,
  onChangeError,
}: ObjectProps<T, E>): PropertyCallbable<T, E> {
  const state = useRef(value);
  state.current = value;
  const stateError = useRef(error);
  stateError.current = error;
  return useCallback(
    Object.defineProperty(
      <K extends keyof T>(propertyName: K) => {
        return {
          value: state.current[propertyName],
          name: propertyName,
          key: propertyName,
          onChange:
            onChange === undefined
              ? undefined
              : (propertyValue: T[K]): void => {
                  onChange(
                    (state.current = {
                      ...state.current,
                      [propertyName]: propertyValue,
                    }),
                  );
                },
          error: stateError.current?.property[propertyName],
          onChangeError:
            onChangeError === undefined
              ? undefined
              : (propertyError: E["property"][K]): void => {
                  onChangeError(
                    (stateError.current = {
                      ...(stateError.current ?? null),
                      property: {
                        ...(stateError.current?.property ?? null),
                        [propertyName]: propertyError,
                      },
                    } as E),
                  );
                },
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
