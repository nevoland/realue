export type ErrorMessage = string;

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
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
