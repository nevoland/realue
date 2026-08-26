/**
 * Returns the unique identifier of the provided `item` found at the specified `index`. Used as the `id` and `key` of the item props.
 *
 * @param index The index of the item.
 * @param item The value of the item.
 * @returns The unique identifier of the item.
 */
export type ItemId<T> = (item: T, index: number) => string;
