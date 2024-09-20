/**
 * Updates the object type `T` to make `RequiredKeys` required and `OmittedKeys` optionally `undefined`.
 */
export type Select<
  T,
  RequiredKeys extends keyof T = never,
  OmittedKeys extends keyof T = never,
> = Omit<T, RequiredKeys | OmittedKeys> &
  Required<Pick<T, RequiredKeys>> & { [key in OmittedKeys]?: undefined };
