import type { FunctionComponent } from "../dependencies/types";
import {
  EMPTY_ARRAY,
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
  NevoProps,
  ValueMutator,
} from "../types";

/**
 * Takes an array and returns a function that generates the required props for handling an array item value.
 * That function also contains three callables: `loop`, `add`, and `remove`.
 *
 * @param props Properties according to the NEVO pattern, where the `value` holds an array.
 * @param itemId An optional function that returns a unique identifier for a given array `item`.
 * @returns The `item` function that returns the props for a specific item `index`.
 */
export function useArray<
  A extends readonly any[] | undefined,
  G extends ErrorReportArray<NonNullable<A>>,
  T = NonNullable<A> extends readonly (infer H)[] ? H : never,
  E extends ErrorReport<any> = ErrorReport<T>,
>(
  props: NevoProps<A, G>,
  itemId: ItemId<T> = itemIdDefault,
): ItemCallable<T, E> {
  const { name, onChange, error, onChangeError } = props;
  const value = (props.value ?? EMPTY_ARRAY) as NonNullable<A>;
  const state = useRef(value);
  state.current = value;
  const stateError = useRef(error);
  stateError.current = error;
  const stateName = useRef(name);
  stateName.current = name;
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
              ] as unknown as NonNullable<A>),
              stateName.current,
            );
          },
    [onChange],
  );
  const onChangeItemError: ErrorMutator<ErrorReport<T>> | undefined = useMemo(
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
              (stateError.current = changeError<A, G>(
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
                      ] as unknown as NonNullable<A>),
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
                    const itemErrorList = {} as G;
                    for (let index = 0; index < indexList.length; index++) {
                      const currentItemIndex = indexList[index];
                      if (currentItemIndex < itemIndex) {
                        (itemErrorList as any)[currentItemIndex] =
                          currentErrorList[currentItemIndex];
                        continue;
                      }
                      if (currentItemIndex >= itemIndex) {
                        (itemErrorList as any)[currentItemIndex + 1] =
                          currentErrorList[currentItemIndex];
                      }
                    }
                    onChangeError(
                      (stateError.current = itemErrorList),
                      stateName.current,
                    );
                  }) as ItemCallable<T, E>["add"]),
          },
          loop: {
            configurable: false,
            value: ((
              Component: FunctionComponent<ItemProps<T>>,
              extraProps?: {} | ((props: ItemProps<T>) => {}),
            ) => {
              const getExtraProps =
                extraProps === undefined
                  ? undefined
                  : typeof extraProps === "function"
                    ? extraProps
                    : () => extraProps;
              return state.current.map((_, index) => {
                const props: ItemProps<T, E> = item(index);
                return createElement(
                  Component,
                  getExtraProps !== undefined
                    ? { ...props, ...getExtraProps(props) }
                    : props,
                );
              });
            }) as ItemCallable<T, E>["loop"],
          },
          remove: {
            configurable: false,
            value:
              onChange === undefined
                ? undefined
                : (((itemIndexOrName) => {
                    const itemIndex = +itemIndexOrName;
                    onChange(
                      (state.current = (itemIndex === 0
                        ? [...state.current.slice(1)]
                        : [
                            ...state.current.slice(0, itemIndex),
                            ...state.current.slice(itemIndex + 1),
                          ]) as unknown as NonNullable<A>),
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
                    const itemErrorList = {} as G;
                    for (let index = 0; index < indexList.length; index++) {
                      const currentItemIndex = indexList[index];
                      if (currentItemIndex < itemIndex) {
                        (itemErrorList as any)[currentItemIndex] =
                          currentErrorList[currentItemIndex];
                        continue;
                      }
                      if (currentItemIndex > itemIndex) {
                        (itemErrorList as any)[currentItemIndex - 1] =
                          currentErrorList[currentItemIndex];
                      }
                    }
                    onChangeError(
                      (stateError.current = undefinedIfEmpty(itemErrorList)),
                      stateName.current,
                    );
                  }) as ItemCallable<T, E>["remove"]),
          },
          get: {
            configurable: false,
            value: ((itemIndexOrName) =>
              state.current[+itemIndexOrName]) as ItemCallable<T, E>["get"],
          },
        },
      ) as ItemCallable<T, E>,
    [onChangeItem, onChangeItemError, itemId],
  );
  return item as ItemCallable<T, E>;
}

function toNumber(value: string): number {
  return +value;
}
