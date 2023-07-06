export type ErrorMessage = string;

type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
};

export type Name = string;

export type ValueValidator<T> = (
  value?: T,
) => Promise<ErrorReport<T> | undefined>;

export type ValueMutator<T> = (value: T | undefined, name: Name) => void;

export type ErrorMutator<E> = (error: E | undefined, name: Name) => void;

export type NevoProps<T, E = ErrorReport<T>> = {
  name: string;
  error?: E;
  value?: T;
  onChange?: ValueMutator<T>;
  onChangeError?: ErrorMutator<E>;
};

export type ErrorReport<T, N = NonNullable<T>> = N extends unknown[]
  ? ErrorReportArray<N>
  : N extends object
  ? ErrorReportObject<N>
  : ErrorMessage[];

export type ErrorReportArray<T extends unknown[]> = {
  value: ErrorMessage[];
  item: { [K in keyof T as number]: ErrorReport<T[K]> };
};

export type ErrorReportObject<T extends object> = {
  value: ErrorMessage[];
  property: Partial<{ [K in keyof T]: ErrorReport<T[K]> }>;
};
