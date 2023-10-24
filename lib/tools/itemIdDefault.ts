/**
 * Default function used by `useArray` for defining the unique identifier of an item.
 *
 * @param index Array index of the item.
 * @param item Value of the item.
 * @returns A unique identifier string for this item.
 */
export function itemIdDefault<T>(index: number, item: T): string {
  return (item as { id: string })?.id ?? `${index}`;
}
