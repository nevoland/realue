import type { FunctionComponent } from "./dependencies";

export type ErrorMessage = string;

// type Mutable<T extends object> = {
//   -readonly [K in keyof T]: T[K];
// };

export type Name = NameProperty | NameItem;

export type NameProperty = string;

export type NameItem = `${number}`;

export type ValueValidator<T, N extends string = Name> = (
  value: T,
  name: N,
) => Promise<ErrorMessage[] | undefined> | ErrorMessage[] | undefined;

export type ValueMutator<T, N extends string = Name> = (
  value: T,
  name: N,
) => void;

export type ValueRemover = (name: NameItem) => void;

export type ErrorMutator<E, N extends string = Name> = (
  error: E | undefined,
  name?: N | "",
) => void;

export type ItemId = <T>(index: number, item: T) => string;

export type NevoProps<T, N extends string = Name, E = ErrorReport<T>> = {
  name: N;
  error?: E;
  value: T;
  onChange?: ValueMutator<T, N>;
  onChangeError?: ErrorMutator<E, N>;
};

export type ErrorReport<T, U = NonNullable<T>> = U extends unknown[]
  ? ErrorReportArray<U>
  : U extends object
  ? ErrorReportObject<U>
  : ErrorMessage[];

export type ErrorReportArray<T extends unknown[]> = {
  [K in keyof T as number]: ErrorReport<T[K]>;
} & {
  ""?: ErrorMessage[];
};

export type ErrorReportObject<T extends object> = Partial<{
  [K in keyof T]: ErrorReport<T[K]>;
}> & {
  ""?: ErrorMessage[];
};

/**
 * Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.
 *
 * @param propertyName The name of the property for which to generate the props.
 */
export interface PropertyCallbable<
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

export type ObjectProps<T, E> = {
  name: Name;
  value?: T;
  onChange?: ValueMutator<T>;
  error?: E;
  onChangeError?: ErrorMutator<E>;
};

export type ItemProps<
  T,
  N extends string,
  E extends ErrorReportArray<T[]>,
> = NevoProps<T, N, E[number]> & { key: string; id: string };

/**
 * Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.
 *
 * @param itemIndex The index of the item for which to generate the props.
 */
export interface ItemCallable<
  T,
  N extends string,
  E extends ErrorReportArray<T[]>,
> {
  (itemIndex: number): ItemProps<T, N, E>;
  (): NevoProps<T[], N, E[""]>;
  /**
   * Loops over the items of the array and creates an instance
   *
   * @param Component
   * @param extraProps An object containing extra properties to add to each element, or a function that takes the items props and returns the extra properties to add.
   * @returns An array containing the produced elements out of `Component`.
   */
  readonly loop: (
    Component: FunctionComponent<ItemProps<T, N, E>>,
    extraProps?: {} | ((props: ItemProps<T, N, E>) => {}),
  ) => ReturnType<FunctionComponent>[];
  /**
   * Inserts an item at the specified index, shifting by one the previous item found at this index and its subsequent ones.
   *
   * @param item The item to add.
   * @param index The index where to add this item.
   */
  readonly add: (item: T, index?: number | `${number}`) => void;
  /**
   * Removes the item found at the specified `index`.
   *
   * @param index The index of the item to remove.
   */
  readonly remove: (index: number | `${number}`) => void;
}
