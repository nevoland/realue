import { useRef, useMemo } from "../dependencies";
import { omitKey } from "../tools/omitKey";
import { undefinedIfEmpty } from "../tools/undefinedIfEmpty";
import type {
  ErrorMutator,
  ErrorReport,
  ErrorReportObject,
  Name,
  NevoProps,
  ValueMutator,
} from "../types";

/* 
{
    value: T[K];
    name: K;
    key: string;
    onChange: ValueMutator<T[K]>;
    error:
      | Partial<{ [K in keyof T]: ErrorReport<T[K], NonNullable<T[K]>> }>[K]
      | undefined;
    onChangeError: ErrorMutator<E[K]> | undefined;
  }

*/

interface PropertyCallbable<
  T extends object,
  N extends string,
  E extends ErrorReportObject<T>,
> {
  <K extends keyof T>(
    propertyName: K,
  ): NevoProps<
    T[K],
    N,
    Partial<{ [K in keyof T]: ErrorReport<T[K], NonNullable<T[K]>> }>[K]
  > & { key: string };
  (): NevoProps<T, N, E[""]>;
}

type ObjectProps<T, E> = {
  name: Name;
  value?: T;
  onChange?: ValueMutator<T>;
  error?: E;
  onChangeError?: ErrorMutator<E>;
};

/**
 * Takes an object and returns a function that generates the required props for handling an object property value.
 */
export function useObject<
  T extends object,
  N extends string,
  E extends ErrorReportObject<T>,
>({
  name,
  value = {} as T,
  onChange,
  error,
  onChangeError,
}: ObjectProps<T, E>): PropertyCallbable<T, N, E> {
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
              (stateError.current = undefinedIfEmpty<E>(
                (propertyError === undefined
                  ? omitKey(stateError.current, propertyName)
                  : {
                      ...(stateError.current ?? null),
                      [propertyName]: propertyError,
                    }) as E,
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
