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

export type ItemKey = <T>(index: number, item: T) => string;

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
