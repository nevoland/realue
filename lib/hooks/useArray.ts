import { useRef, useMemo } from "../dependencies";

import { omitKey } from "../tools/omitKey";
import { undefinedIfEmpty } from "../tools/undefinedIfEmpty";
import type {
  ErrorMutator,
  ErrorReportArray,
  NameItem,
  NevoProps,
  ValueMutator,
} from "../types";

type Renderer = (index: number) => any;

interface ItemCallbable<T, E extends ErrorReportArray<T[]>> {
  (itemIndex: number): NevoProps<T, E[number]> & { key: string };
  (): NevoProps<T[], E[""]>;
  readonly loop: (renderer: Renderer) => any[];
  readonly add: (index: number, item: T | undefined) => void;
  readonly remove: (index: number) => void;
}

function itemKeyDefault<T>(index: number, item: T | undefined) {
  return (item as { id: string })?.id ?? index;
}

function toNumber(value: string): number {
  return +value;
}

export function useArray<T, E extends ErrorReportArray<T[]>>(
  {
    name,
    value = [],
    onChange,
    error,
    onChangeError,
  }: NevoProps<(T | undefined)[], E>,
  itemKey: (index: number, item: T | undefined) => string = itemKeyDefault,
): ItemCallbable<T, E> {
  const state = useRef(value);
  state.current = value;
  const stateError = useRef(error);
  stateError.current = error;
  const stateName = useRef(name);
  stateName.current = name;
  const onChangeItem: ValueMutator<T, NameItem> | undefined = useMemo(
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
              stateName.current,
            );
          },
    [onChange],
  );
  const onChangeItemError: ErrorMutator<E[number], NameItem> | undefined =
    useMemo(
      () =>
        onChangeError === undefined
          ? undefined
          : (itemError, itemIndex): void => {
              const itemName = itemIndex === undefined ? "" : +itemIndex;
              if (itemError === stateError.current?.[itemName]) {
                return;
              }
              onChangeError(
                (stateError.current = undefinedIfEmpty(
                  (itemError === undefined
                    ? omitKey(stateError.current, itemName)
                    : {
                        ...(stateError.current ?? null),
                        [itemName]: itemError,
                      }) as E,
                )),
                stateName.current,
              );
            },
      [onChangeError],
    );
  return useMemo(
    () =>
      Object.defineProperties(
        (itemIndex?: number) => {
          if (itemIndex === undefined) {
            return {
              value: state.current,
              name: "",
              onChange,
              error: stateError.current?.[""],
              onChangeError: onChangeItemError,
            };
          }
          const value = state.current?.[itemIndex];
          return {
            value,
            name: `${itemIndex}`,
            key: itemKey(itemIndex, value),
            onChange: onChangeItem,
            error: stateError.current?.[itemIndex],
            onChangeError: onChangeItemError,
          };
        },
        {
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
                : (((itemIndex, itemValue) => {
                    onChange(
                      (state.current = [
                        ...state.current.slice(0, itemIndex),
                        itemValue,
                        ...state.current.slice(itemIndex),
                      ]),
                      stateName.current,
                    );
                    const currentErrorList = stateError.current;
                    if (
                      currentErrorList === undefined ||
                      onChangeError === undefined
                    ) {
                      return;
                    }
                    const indexList =
                      Object.getOwnPropertyNames(currentErrorList).map(
                        toNumber,
                      );
                    if (indexList.length === 0) {
                      return;
                    }
                    indexList.sort();
                    if (indexList[indexList.length - 1] < itemIndex) {
                      return;
                    }
                    const itemErrorList = {} as E;
                    for (let index = 0; index < indexList.length; index++) {
                      const currentItemIndex = indexList[index];
                      if (currentItemIndex < itemIndex) {
                        itemErrorList[currentItemIndex] =
                          currentErrorList[currentItemIndex];
                        continue;
                      }
                      if (currentItemIndex >= itemIndex) {
                        itemErrorList[currentItemIndex + 1] =
                          currentErrorList[currentItemIndex];
                      }
                    }
                    onChangeError(
                      (stateError.current = itemErrorList),
                      stateName.current,
                    );
                  }) as ItemCallbable<T, E>["add"]),
          },
          remove: {
            configurable: false,
            value:
              onChange === undefined
                ? undefined
                : (((itemIndex) => {
                    onChange(
                      (state.current = [
                        ...state.current.slice(0, itemIndex),
                        ...state.current.slice(itemIndex + 1),
                      ]),
                      stateName.current,
                    );
                    const currentErrorList = stateError.current;
                    if (
                      currentErrorList === undefined ||
                      onChangeError === undefined
                    ) {
                      return;
                    }
                    const indexList =
                      Object.getOwnPropertyNames(currentErrorList).map(
                        toNumber,
                      );
                    if (indexList.length === 0) {
                      return;
                    }
                    indexList.sort();
                    const itemErrorList = {} as E;
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
                      (stateError.current = undefinedIfEmpty(itemErrorList)),
                      stateName.current,
                    );
                  }) as ItemCallbable<T, E>["remove"]),
          },
        },
      ) as ItemCallbable<T, E>,
    [onChangeItem, onChangeItemError, itemKey],
  );
}
