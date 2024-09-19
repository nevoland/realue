/**
 * Selects keys to make them required and omits keys.
 */
export type Select<
  T,
  R extends keyof T = never,
  O extends keyof T = never,
> = Omit<T, R | O> & Required<Pick<T, R>>;
