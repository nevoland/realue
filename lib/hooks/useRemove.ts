import { useMemo } from "../dependencies.js";
import type { Name, NameItem, ValueRemover } from "../types";

/**
 * Returns a callback that applies the provided `name` to the provided `onRemove(name)` callback.
 *
 * @param props Properties `name` and `onRemove(name)`.
 * @returns A callback with `name` applied to `onRemove(name)`.
 */
export function useRemove(props: { name: Name; onRemove?: ValueRemover }) {
  const { name, onRemove } = props;
  return useMemo(
    () =>
      onRemove === undefined ? undefined : () => onRemove(name as NameItem),
    [name, onRemove],
  );
}
