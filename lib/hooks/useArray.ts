import { useRef, useCallback } from "../dependencies";
import type { ErrorReport, ErrorReportArray } from "../types";

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
  value?: T[];
  onChange?: (value: T[]) => void;
  error?: E;
  onChangeError?: (error: E) => void;
};

export function useArray<T, E extends ErrorReportArray<T[]>>(
  { value = [], onChange, error, onChangeError }: ArrayProps<T, E>,
  itemId: (item: T, index: number) => string = itemIdDefault,
): ItemCallbable<T, E> {
  const state = useRef(value);
  state.current = value;
  const stateError = useRef(error);
  stateError.current = error;
  return useCallback(
    Object.defineProperties(
      (itemIndex: number) => {
        const value = state.current[itemIndex];
        const itemName = itemId(value, itemIndex);
        return {
          value,
          name: itemName,
          key: itemName,
          onChange:
            onChange === undefined
              ? undefined
              : (itemValue: T): void => {
                  onChange(
                    (state.current = [
                      ...state.current.slice(0, itemIndex),
                      itemValue,
                      ...state.current.slice(itemIndex + 1),
                    ]),
                  );
                },
          error: stateError.current?.item[itemIndex],
          onChangeError:
            onChangeError === undefined
              ? undefined
              : (itemError: E["item"][number]): void => {
                  onChangeError(
                    (stateError.current = {
                      ...(stateError.current ?? null),
                      item: {
                        ...(stateError.current?.item ?? null),
                        [itemIndex]: itemError,
                      },
                    } as E),
                  );
                },
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
    [onChange, itemId],
  );
}
