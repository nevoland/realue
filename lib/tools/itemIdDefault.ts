/**
 * Default function used by `useArray` for defining the unique identifier of an item.
 *
 * @param item Value of the item.
 * @param index Array index of the item.
 * @returns A unique identifier string for this item.
 */
export function itemIdDefault<T>(item: T, index: number): string {
  return String((item as { id: string })?.id ?? index);
}
