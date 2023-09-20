import {
  type FunctionComponent,
  useRef,
  useMemo,
  createElement,
  Fragment,
} from "../dependencies";

import { omitKey } from "../tools/omitKey";
import { undefinedIfEmpty } from "../tools/undefinedIfEmpty";
import type {
  ErrorMutator,
  ErrorReportArray,
  NameItem,
  NevoProps,
  ValueMutator,
} from "../types";

interface ItemCallbable<T, N extends string, E extends ErrorReportArray<T[]>> {
  (itemIndex: number): NevoProps<T, N, E[number]> & { key: string };
  (): NevoProps<T[], N, E[""]>;
  readonly loop: (
    component: FunctionComponent<NevoProps<T, N, E[number]>>,
  ) => ReturnType<FunctionComponent>[];
  readonly add: (item: T, index?: number | `${number}`) => void;
  readonly remove: (index: number | `${number}`) => void;
}

function itemKeyDefault<T>(index: number, item: T) {
  return (item as { id: string })?.id ?? index;
}

function toNumber(value: string): number {
  return +value;
}

/**
 * Takes an array and returns a function that generates the required props for handling an array item value.
 */
export function useArray<
  A extends any[] | undefined,
  N extends string,
  E extends ErrorReportArray<NonNullable<A>>,
  T = A extends (infer H)[] ? H : never,
>(
  { name, value = [], onChange, error, onChangeError }: NevoProps<A, N, E>,
  itemKey: (index: number, item: T) => string = itemKeyDefault,
): ItemCallbable<T, N, E> {
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
              ]) as A,
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
  const item = useMemo(
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
            id: itemKey(itemIndex, value),
            onChange: onChangeItem,
            error: stateError.current?.[itemIndex],
            onChangeError: onChangeItemError,
          };
        },
        {
          loop: {
            configurable: false,
            value: (component: FunctionComponent<NevoProps<T, N, E[number]>>) =>
              state.current.map((_, index) => {
                const { key, ...props } = item(index);
                // FIXME: Creating an element out of `component` triggers an infinite loop
                return createElement(Fragment, { key }, component(props));
              }),
          },
          add: {
            configurable: false,
            value:
              onChange === undefined
                ? undefined
                : (((itemValue, itemIndexOrName = state.current.length) => {
                    const itemIndex = +itemIndexOrName;
                    onChange(
                      (state.current = [
                        ...state.current.slice(0, itemIndex),
                        itemValue,
                        ...state.current.slice(itemIndex),
                      ]) as A,
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
                  }) as ItemCallbable<T, N, E>["add"]),
          },
          remove: {
            configurable: false,
            value:
              onChange === undefined
                ? undefined
                : (((itemIndexOrName) => {
                    const itemIndex = +itemIndexOrName;
                    onChange(
                      (state.current =
                        itemIndex === 0
                          ? [...state.current.slice(1)]
                          : [
                              ...state.current.slice(0, itemIndex),
                              ...state.current.slice(itemIndex + 1),
                            ]) as A,
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
                  }) as ItemCallbable<T, N, E>["remove"]),
          },
        },
      ) as ItemCallbable<T, N, E>,
    [onChangeItem, onChangeItemError, itemKey],
  );
  return item;
}
