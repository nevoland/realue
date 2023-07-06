import { useRef, useCallback, useMemo } from "../dependencies";
import type {
  ErrorMutator,
  ErrorReport,
  ErrorReportArray,
  Name,
  ValueMutator,
} from "../types";

type Renderer = (index: number) => any;

interface ItemCallbable<T, E extends ErrorReportArray<T[]>> {
  (itemIndex: number): {
    value: T;
    name: `${number}`;
    key: string;
    onChange: ValueMutator<T>;
    error: ErrorReport<T, NonNullable<T>> | undefined;
    onChangeError: ErrorMutator<E["item"][number]>;
  };
  parent: T[];
  loop(renderer: Renderer): any[];
  add(index: number, item: T): void;
  remove(index: number): void;
}

function itemKeyDefault<T>(index: number, item: T | undefined) {
  return (item as { id: string })?.id ?? index;
}

type ArrayProps<T, E> = {
  name: Name;
  value?: T[];
  onChange?: ValueMutator<T[]>;
  error?: E;
  onChangeError?: ErrorMutator<E>;
};

export function useArray<T, E extends ErrorReportArray<T[]>>(
  { name, value = [], onChange, error, onChangeError }: ArrayProps<T, E>,
  itemKey: (index: number, item: T | undefined) => string = itemKeyDefault,
): ItemCallbable<T, E> {
  const state = useRef(value);
  state.current = value;
  const stateError = useRef(error);
  stateError.current = error;
  const onChangeItem: ValueMutator<T> | undefined = useMemo(
    () =>
      onChange === undefined
        ? undefined
        : (itemValue, itemIndex): void => {
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
  const onChangeItemError: ErrorMutator<E["item"][number]> | undefined =
    useMemo(
      () =>
        onChangeError === undefined
          ? undefined
          : (itemError, itemIndex): void => {
              onChangeError(
                (stateError.current = {
                  ...(stateError.current ?? null),
                  item: {
                    ...(stateError.current?.item ?? null),
                    [itemIndex]: itemError,
                  },
                } as E),
                name,
              );
            },
      [onChangeError, name],
    );
  return useCallback(
    Object.defineProperties(
      (itemIndex: number) => {
        const value = state.current[itemIndex];
        return {
          value,
          name: `${itemIndex}`,
          key: itemKey(itemIndex, value),
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
        add: {
          configurable: false,
          value:
            onChange === undefined
              ? undefined
              : (itemIndex: number, itemValue: T) => {
                  onChange(
                    (state.current = [
                      ...state.current.slice(0, itemIndex),
                      itemValue,
                      ...state.current.slice(itemIndex),
                    ]),
                    name,
                  );
                },
        },
        remove: {
          configurable: false,
          value:
            onChange === undefined
              ? undefined
              : (itemIndex: number) => {
                  onChange(
                    (state.current = [
                      ...state.current.slice(0, itemIndex),
                      ...state.current.slice(itemIndex + 1),
                    ]),
                    name,
                  );
                  const currentErrorList = stateError.current?.item;
                  if (
                    currentErrorList === undefined ||
                    onChangeError === undefined
                  ) {
                    return;
                  }
                  const indexList = Object.getOwnPropertyNames(
                    currentErrorList,
                  ).map((itemIndex) => +itemIndex);
                  if (indexList.length === 0) {
                    return;
                  }
                  indexList.sort();
                  const itemErrorList: E["item"] = {};
                  for (let index = 0; index < indexList.length; index++) {
                    const currentItemIndex = indexList[index];
                    if (currentItemIndex < itemIndex) {
                      itemErrorList[currentItemIndex] =
                        currentErrorList[currentItemIndex];
                      continue;
                    }
                    if (currentItemIndex > itemIndex) {
                      itemErrorList[currentItemIndex - 1] =
                        currentErrorList[currentItemIndex];
                    }
                  }
                  onChangeError(
                    (stateError.current = {
                      ...(stateError.current ?? null),
                      item: itemErrorList,
                    } as E),
                    name,
                  );
                },
        },
      },
    ) as ItemCallbable<T, E>,
    [onChangeItem, onChangeItemError, itemKey],
  );
}

function compareNumberString(a: string, b: string) {
  return +a - +b;
}
