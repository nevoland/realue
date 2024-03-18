import {
  type FunctionComponent,
  createElement,
  undefinedIfEmpty,
  useMemo,
  useRef,
} from "../dependencies.js";
import { childrenError } from "../tools/childrenError.js";
import { globalError } from "../tools/globalError.js";
import { itemIdDefault } from "../tools/itemIdDefault.js";
import { changeError } from "../tools.js";
import type {
  ErrorMutator,
  ErrorReport,
  ErrorReportArray,
  ItemCallable,
  ItemId,
  ItemProps,
  NameItem,
  NevoProps,
  ValueMutator,
} from "../types";

/**
 * Takes an array and returns a function that generates the required props for handling an array item value.
 * That function also contains three callables: `loop`, `add`, and `remove`.
 *
 * @param props The props holding the array `value`.
 * @param itemId An optional function that returns a unique identifier for a given array `item`.
 * @returns The `item` function that returns the props for a specific item `index`.
 */
export function useArray<
  A extends any[] | undefined,
  N extends string,
  E extends ErrorReportArray<NonNullable<A>>,
  T = A extends (infer H)[] ? H : never,
>(
  props: NevoProps<A, N, E>,
  itemId: ItemId<T> = itemIdDefault,
): ItemCallable<T, N> {
  const { name, onChange, error, onChangeError } = props;
  const value: T[] = props.value ?? [];
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
  const onChangeItemError: ErrorMutator<ErrorReport<T>, NameItem> | undefined =
    useMemo(
      () =>
        onChangeError === undefined
          ? undefined
          : (itemError, itemIndex): void => {
              const itemName = itemIndex === undefined ? "" : +itemIndex;
              if (
                (itemName === "" &&
                  itemError === globalError(stateError.current)) ||
                itemError ===
                  childrenError(stateError.current)?.[itemName as number]
              ) {
                return;
              }
              onChangeError(
                (stateError.current = changeError<A, E>(
                  stateError.current,
                  itemName,
                  itemError as any,
                )),
                name,
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
              error: globalError(stateError.current),
              name: "",
              onChange,
              onChangeError: onChangeItemError,
              value: state.current,
            };
          }
          const value = state.current?.[itemIndex];
          const id = itemId(itemIndex, value);
          return {
            error: childrenError(stateError.current)?.[itemIndex],
            id,
            key: id,
            name: `${itemIndex}`,
            onChange: onChangeItem,
            onChangeError: onChangeItemError,
            value,
          };
        },
        {
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
                  }) as ItemCallable<T, N>["add"]),
          },
          loop: {
            configurable: false,
            value: ((
              Component: FunctionComponent<ItemProps<T, N>>,
              extraProps?: {} | ((props: ItemProps<T, N>) => {}),
            ) => {
              const getExtraProps =
                extraProps === undefined
                  ? undefined
                  : typeof extraProps === "function"
                  ? extraProps
                  : () => extraProps;
              return state.current.map((_, index) => {
                const props: ItemProps<T, NameItem> = item(index);
                return createElement(
                  Component,
                  getExtraProps !== undefined
                    ? { ...props, ...getExtraProps(props) }
                    : props,
                );
              });
            }) as ItemCallable<T, N>["loop"],
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
                  }) as ItemCallable<T, N>["remove"]),
          },
        },
      ) as ItemCallable<T, N>,
    [onChangeItem, onChangeItemError, itemId],
  );
  return item as ItemCallable<T, N>;
}

function toNumber(value: string): number {
  return +value;
}
