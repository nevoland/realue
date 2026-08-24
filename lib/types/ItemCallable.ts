import type { FunctionComponent } from "../dependencies/types";

import type { ItemAdder } from "./ItemAdder";
import type { ItemId } from "./ItemId";
import type { ItemProps } from "./ItemProps";
import type { ItemRemover } from "./ItemRemover";
import type { NevoProps } from "./NevoProps";

/**
 * Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.
 *
 * @param itemIndex The index of the item for which to generate the props.
 */
export interface ItemCallable<T> {
  (itemIndex: number): ItemProps<T>;
  (): NevoProps<readonly T[]>;
  /**
   * Returns an array that maps each item with an element out of `Component` with the NEVO props and optional extra props.
   *
   * @param Component
   * @param extraProps An object containing extra properties to add to each element, or a function that takes the items props and returns the extra properties to add.
   * @returns An array containing the produced elements out of `Component`.
   */
  readonly loop: <P extends object>(
    Component: FunctionComponent<ItemProps<T> & P>,
    extraProps?: P | ((props: ItemProps<T>) => P),
  ) => ReturnType<FunctionComponent<ItemProps<T> & P>>[];
  /**
   * Inserts an item at the specified index, shifting by one the previous item found at this index and its subsequent ones.
   *
   * @param item The item to add.
   * @param index The index where to add this item (defaults to the length of the array).
   */
  // FIXME: Show as `undefined` if `onChange` is `undefined`
  readonly add: ItemAdder<T>;
  /**
   * Removes the item found at the specified `index`.
   *
   * @param index The index of the item to remove.
   */
  // FIXME: Show as `undefined` if `onChange` is `undefined`
  readonly remove: ItemRemover;
  /**
   * Retreives the item found at the specified `index`.
   *
   * @param index The index of the item to retreive, or `undefined` if none was found.
   */
  readonly at: (index: number) => T | undefined;
  /**
   * Returns the unique identifier of the provided `item` found at the specified `index`. Used as the `id` and `key` of the item props.
   *
   * @param index The index of the item.
   * @param item The value of the item.
   * @returns The unique identifier of the item.
   */
  readonly itemId: ItemId<T>;
}
