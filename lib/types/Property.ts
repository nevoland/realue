/**
 * Returns an object type with a single property.
 */
export type Property<K extends PropertyKey, V> = {
  [P in K]: { [Q in P]: V };
}[K];
