import type { DebouncedFunction, FunctionComponent } from "./dependencies";

export type { DebouncedFunction };

export type ErrorMessage = string;

// type Mutable<T extends object> = {
//   -readonly [K in keyof T]: T[K];
// };

/**
 * Returns an object type with a single property.
 */
type Property<K extends PropertyKey, V> = { [P in K]: { [Q in P]: V } }[K];

export type Name = NameProperty | NameItem;

export type NameProperty = string;

export type NameItem = `${number}`;

/**
 * Function that valides a `value` with a given `name` and returns a promise that resolves to an error, if any.
 */
export type ValueValidator<T, N extends string = Name> = (
  value: T,
  name: N,
) => Promise<ErrorMessage[] | undefined> | ErrorMessage[] | undefined;

/**
 * Function that changes a `value`. Used as the signature for the `onChange` callback of the NEVO pattern.
 */
export type ValueMutator<T, N extends string = Name> = (
  value: T,
  name: N,
) => void;

/**
 * Function that removes an array item at index `name`.
 */
export type ValueRemover = (name: NameItem) => void;

/**
 * Function that mutates an `error`. Used as the signature for the `onChangeError` callback of the NEVO pattern.
 */
export type ErrorMutator<E, N extends string = Name> = (
  error: E | undefined,
  name?: N | "",
) => void;

export type ItemId<T> = (index: number, item: T) => string;

/**
 * Set of properties that define the NEVO pattern:
 * - `name`: The name used to identify the entity represented by the `value`.
 * - `error`: An error object describing issues to be shown.
 * - `value`: The value to be handled by a component.
 * - `onChange`: The callback the component uses to notify the parent component about changes of the `value`.
 * - `onChangeError`: The callback the component uses to notify the parent component about changes of the `error`.
 */
export type NevoProps<T, N extends string = Name, E = ErrorReport<T>> = {
  /**
   * The name used to identify the entity represented by the `value`.
   */
  name: N;
  /**
   * An error object describing issues to be shown.
   */
  error?: E;
  /**
   * The value to be handled by a component.
   */
  value: T;
  /**
   * The callback the component uses to notify the parent component about changes of the `value`.
   */
  onChange?: ValueMutator<T, N>;
  /**
   * The callback the component uses to notify the parent component about changes of the `error`.
   */
  onChangeError?: ErrorMutator<E, N>;
};

/**
 * Excludes the props following the NEVO pattern. Useful for creating discriminated union types that enable component uses that do not necessitate the NEVO pattern.
 */
export type NeverNevoProps = {
  value?: never;
  name?: never;
  onChange?: never;
  error?: never;
  onChangeError?: never;
};

export type NevoPropsAdapted<
  T,
  K extends string,
  N extends string = Name,
  E = ErrorReport<T>,
> = Property<`${K}Name`, N> &
  Property<`${K}Error`, E> &
  Property<K, T> &
  Property<`onChange${Capitalize<K>}`, ValueMutator<T, N>> &
  Property<`onChange${Capitalize<K>}Error`, ErrorMutator<E, N>>;

/**
 * Options for `useTransform`.
 */
export type UseTransformOptions<T, U> = {
  /**
   * Transform the incoming `value`.
   *
   * @param value The incoming `value` to transform.
   * @returns The transformed value.
   */
  value: (value: T) => U;
  /**
   * Transforms the outgoing `value` passed to the `onChange` callback.
   *
   * @param value The outgoing `value` to transform.
   * @returns The transformed value.
   */
  onChange: (value: U) => T;
} & (
  | {
      /**
       * Optionally transform the incoming `error`.
       *
       * @param error The incoming `error` to transform.
       * @returns The transformed error.
       */
      error: (error: ErrorReport<T> | undefined) => ErrorReport<U> | undefined;
      /**
       * Optionally transform the outgoing `error` passed to the `onChangeError` callback.
       *
       * @param error The outgoing `error` to transform.
       * @returns The transformed error.
       */
      onChangeError: (
        error: ErrorReport<U> | undefined,
      ) => ErrorReport<T> | undefined;
    }
  | never
);

export type OptionPropsAdapted<
  T,
  K extends string,
  N extends string = Name,
> = Property<K, T> & Property<`onChange${Capitalize<K>}`, ValueMutator<T, N>>;

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
   * Returns an array that maps each item with an element out of `Component` with the NEVO props and optional extra props.
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
