import type { ErrorMutator } from "./ErrorMutator";
import type { ErrorReport } from "./ErrorReport";
import type { Name } from "./Name";
import type { ValueMutator } from "./ValueMutator";

/**
 * Set of properties that define the NEVO pattern:
 * - `name`: The name used to identify the entity represented by the `value`.
 * - `error`: An error object describing issues to be shown.
 * - `value`: The value to be handled by a component.
 * - `onChange`: The callback the component uses to notify the parent component about changes of the `value`.
 * - `onChangeError`: The callback the component uses to notify the parent component about changes of the `error`.
 */
export type NevoProps<T> = {
  /**
   * The name used to identify the entity represented by the `value`.
   */
  name: Name;
  /**
   * An error object describing issues to be shown.
   */
  error?: ErrorReport<T>;
  /**
   * The value to be handled by a component.
   */
  value: T;
  /**
   * The callback the component uses to notify the parent component about changes of the `value`.
   */
  onChange?: ValueMutator<T>;
  /**
   * The callback the component uses to notify the parent component about changes of the `error`.
   */
  onChangeError?: ErrorMutator<T>;
};
