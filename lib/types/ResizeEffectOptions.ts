/**
 * Options to use with the `useResizeEffect` hook.
 */
export type ResizeEffectOptions = {
  /**
   * Whether parents should be observed as well.
   */
  parents?: boolean;
  /**
   * Sets which box model the observer will observe changes to.
   */
  box?: ResizeObserverBoxOptions;
};
