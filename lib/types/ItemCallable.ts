import type { FunctionComponent } from "../dependencies";

import type { ErrorReportValue } from "./ErrorReportValue";
import type { ItemProps } from "./ItemProps";
import type { NevoProps } from "./NevoProps";

/**
 * Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.
 *
 * @param itemIndex The index of the item for which to generate the props.
 */
export interface ItemCallable<T, N extends string> {
  (itemIndex: number): ItemProps<T, N>;
  (): NevoProps<T[], N, ErrorReportValue>;
  /**
   * Returns an array that maps each item with an element out of `Component` with the NEVO props and optional extra props.
   *
   * @param Component
   * @param extraProps An object containing extra properties to add to each element, or a function that takes the items props and returns the extra properties to add.
   * @returns An array containing the produced elements out of `Component`.
   */
  readonly loop: (
    Component: FunctionComponent<ItemProps<T, N>>,
    extraProps?: {} | ((props: ItemProps<T, N>) => {}),
  ) => ReturnType<FunctionComponent>[];
  /**
   * Inserts an item at the specified index, shifting by one the previous item found at this index and its subsequent ones.
   *
   * @param item The item to add.
   * @param index The index where to add this item.
   */
  readonly add: (item: T, index?: number | `${number}`) => void;
  /**
   * Removes the item found at the specified `index`.
   *
   * @param index The index of the item to remove.
   */
  readonly remove: (index: number | `${number}`) => void;
}
