import type { FunctionComponent } from "../dependencies/types";

import type { ErrorReport } from "./ErrorReport";
import type { ErrorReportValue } from "./ErrorReportValue";
import type { ItemProps } from "./ItemProps";
import type { NevoProps } from "./NevoProps";

/**
 * Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.
 *
 * @param itemIndex The index of the item for which to generate the props.
 */
export interface ItemCallable<T, E extends ErrorReport<any>> {
  (itemIndex: number): ItemProps<T, E>;
  (): NevoProps<T[], ErrorReportValue>;
  /**
   * Returns an array that maps each item with an element out of `Component` with the NEVO props and optional extra props.
   *
   * @param Component
   * @param extraProps An object containing extra properties to add to each element, or a function that takes the items props and returns the extra properties to add.
   * @returns An array containing the produced elements out of `Component`.
   */
  readonly loop: <P extends object>(
    Component: FunctionComponent<ItemProps<T, E> & P>,
    extraProps?: P | ((props: ItemProps<T, E>) => P),
  ) => ReturnType<FunctionComponent<ItemProps<T, E> & P>>[];
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
  readonly remove: (index?: number | `${number}`) => void;
  /**
   * Retreives the item found at the specified `index`.
   *
   * @param index The index of the item to retreive, or `undefined` if none was found.
   */
  readonly get: (index: number | `${number}`) => T | undefined;
}
