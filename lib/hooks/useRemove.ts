import { useMemo } from "../dependencies.js";
import type { Name, NameItem, ValueRemover } from "../types";

export function useRemove(props: { name: Name; onRemove?: ValueRemover }) {
  const { name, onRemove } = props;
  return useMemo(
    () =>
      onRemove === undefined ? undefined : () => onRemove(name as NameItem),
    [name, onRemove],
  );
}
