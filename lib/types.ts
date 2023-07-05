export type ErrorMessage = string;

type Mutable<T extends object> = {
  -readonly [K in keyof T]: T[K];
};

export type Name = string;

export type NevoProps<T, E = ErrorReport<T>> = {
  name: string;
  error?: E;
  value?: T;
  onChange?(value: T, name: Name): void;
  onChangeError?(error: E, name: Name): void;
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
