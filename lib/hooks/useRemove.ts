import { useMemo } from "../dependencies";
import type { Name, NameItem, ValueRemover } from "../types";

export function useRemove({
  name,
  onRemove,
}: {
  name: Name;
  onRemove?: ValueRemover;
}) {
  return useMemo(
    () =>
      onRemove === undefined ? undefined : () => onRemove(name as NameItem),
    [name, onRemove],
  );
}
