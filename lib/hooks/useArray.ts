import {
  type FunctionComponent,
  createElement,
  useMemo,
  useRef,
} from "../dependencies";
import { itemIdDefault } from "../tools/itemIdDefault";
import { setProperty } from "../tools/setProperty";
import { undefinedIfEmpty } from "../tools/undefinedIfEmpty";
import type {
  ErrorMutator,
  ErrorReportArray,
  ItemCallable,
  ItemId,
  ItemProps,
  NameItem,
  NevoProps,
  ValueMutator,
} from "../types";

function toNumber(value: string): number {
  return +value;
}

/**
 * Takes an array and returns a function that generates the required props for handling an array item value.
 * That function also contains three callables: `loop`, `add`, and `remove`.
 */
export function useArray<
  A extends any[] | undefined,
  N extends string,
  E extends ErrorReportArray<NonNullable<A>>,
  T = A extends (infer H)[] ? H : never,
>(
  props: NevoProps<A, N, E>,
  itemId: ItemId<T> = itemIdDefault,
): ItemCallable<T, N, E> {
  const { name, value = [], onChange, error, onChangeError } = props;
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
                  setProperty(
                    stateError.current,
                    itemName,
                    itemError as E[number | ""] | undefined,
                  ),
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
          const id = itemId(itemIndex, value);
          return {
            value,
            name: `${itemIndex}`,
            key: id,
            id,
            onChange: onChangeItem,
            error: stateError.current?.[itemIndex],
            onChangeError: onChangeItemError,
          };
        },
        {
          loop: {
            configurable: false,
            value: ((
              Component: FunctionComponent<ItemProps<T, N, E>>,
              extraProps?: {} | ((props: ItemProps<T, N, E>) => {}),
            ) => {
              const getExtraProps =
                extraProps === undefined
                  ? undefined
                  : typeof extraProps === "function"
                  ? extraProps
                  : () => extraProps;
              return state.current.map((_, index) => {
                const props: ItemProps<T, N, E> = item(index);
                return createElement(
                  Component,
                  getExtraProps !== undefined
                    ? { ...props, ...getExtraProps(props) }
                    : props,
                );
              });
            }) as ItemCallable<T, N, E>["loop"],
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
                  }) as ItemCallable<T, N, E>["add"]),
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
                  }) as ItemCallable<T, N, E>["remove"]),
          },
        },
      ) as ItemCallable<T, N, E>,
    [onChangeItem, onChangeItemError, itemId],
  );
  return item as ItemCallable<T, N, E>;
}
