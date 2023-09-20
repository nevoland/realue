export type ErrorMessage = string;

// type Mutable<T extends object> = {
//   -readonly [K in keyof T]: T[K];
// };

export type Name = NameProperty | NameItem;

export type NameProperty = string;

export type NameItem = `${number}`;

export type ValueValidator<T> = (
  value: T,
  name: Name,
) => Promise<ErrorMessage[] | undefined> | ErrorMessage[] | undefined;

export type ValueMutator<T, N extends string = Name> = (
  value: T,
  name: N,
) => void;

export type ValueRemover = (name: NameItem) => void;

export type ErrorMutator<E, I extends string = Name> = (
  error: E | undefined,
  name?: I | "",
) => void;

export type NevoProps<T, N extends string = Name, E = ErrorReport<T>> = {
  name: N;
  error?: E;
  value: T;
  onChange?: ValueMutator<T, N>;
  onChangeError?: ErrorMutator<E, N>;
};

export type ErrorReport<T, N = NonNullable<T>> = N extends unknown[]
  ? ErrorReportArray<N>
  : N extends object
  ? ErrorReportObject<N>
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
