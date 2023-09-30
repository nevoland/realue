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

export interface ItemCallable<
  T,
  N extends string,
  E extends ErrorReportArray<T[]>,
> {
  (itemIndex: number): ItemProps<T, N, E>;
  (): NevoProps<T[], N, E[""]>;
  readonly loop: (
    component: FunctionComponent<ItemProps<T, N, E>>,
  ) => ReturnType<FunctionComponent>[];
  readonly add: (item: T, index?: number | `${number}`) => void;
  readonly remove: (index: number | `${number}`) => void;
}
