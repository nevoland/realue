import { useRef, useCallback, useMemo } from "../dependencies";
import type { ErrorReport, ErrorReportArray, Name } from "../types";

type Renderer = (index: number) => any;

interface ItemCallbable<T, E extends ErrorReportArray<T[]>> {
  (itemIndex: number): {
    value: T;
    name: string;
    key: string;
    onChange: (itemValue: T) => void;
    error: ErrorReport<T, NonNullable<T>> | undefined;
    onChangeError: ((itemError: E["item"][number]) => void) | undefined;
  };
  loop(renderer: Renderer): any[];
  parent: T[];
}

function itemIdDefault<T>(item: T, index: number) {
  return (item as { id: string })?.id ?? index;
}

type ArrayProps<T, E> = {
  name: Name;
  value?: T[];
  onChange?: (value: T[], name: Name) => void;
  error?: E;
  onChangeError?: (error: E, name: Name) => void;
};

export function useArray<T, E extends ErrorReportArray<T[]>>(
  { name, value = [], onChange, error, onChangeError }: ArrayProps<T, E>,
  itemKey: (item: T, index: number) => string = itemIdDefault,
): ItemCallbable<T, E> {
  const state = useRef(value);
  state.current = value;
  const stateError = useRef(error);
  stateError.current = error;
  const onChangeItem = useMemo(
    () =>
      onChange === undefined
        ? undefined
        : (itemValue: T, itemIndex: Name): void => {
            onChange(
              (state.current = [
                ...state.current.slice(0, +itemIndex),
                itemValue,
                ...state.current.slice(+itemIndex + 1),
              ]),
              name,
            );
          },
    [onChange, name],
  );
  const onChangeItemError = useMemo(
    () =>
      onChangeError === undefined
        ? undefined
        : (itemError: E["item"][number], itemIndex: Name): void => {
            onChangeError(
              (stateError.current = {
                ...(stateError.current ?? null),
                item: {
                  ...(stateError.current?.item ?? null),
                  [itemIndex]: itemError,
                },
              } as E),
              itemIndex,
            );
          },
    [onChangeError],
  );
  return useCallback(
    Object.defineProperties(
      (itemIndex: number) => {
        const value = state.current[itemIndex];
        return {
          value,
          name: `${itemIndex}`,
          key: itemKey(value, itemIndex),
          onChange: onChangeItem,
          error: stateError.current?.item[itemIndex],
          onChangeError: onChangeItemError,
        };
      },
      {
        parent: {
          configurable: false,
          enumerable: false,
          get() {
            return state.current;
          },
        },
        loop: {
          configurable: false,
          value: (renderer: Renderer) =>
            state.current.map((_, index) => renderer(index)),
        },
      },
    ) as ItemCallbable<T, E>,
    [onChange, itemKey],
  );
}
