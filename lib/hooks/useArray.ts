import { useRef, useCallback } from "../dependencies";

function itemIdDefault<T>(item: T, index: number) {
  return (item as { id: string })?.id ?? index;
}

export function useArray<T>(
  value: T[] = [],
  onChange: (value: T[]) => void,
  itemId: (item: T, index: number) => string = itemIdDefault,
) {
  const state = useRef(value);
  state.current = value;
  return useCallback(
    (itemIndex: number) => {
      const value = state.current[itemIndex];
      const itemName = itemId(value, itemIndex);
      return {
        value,
        name: itemName,
        key: itemName,
        onChange: (itemValue: T): void => {
          onChange(
            (state.current = [
              ...state.current.slice(0, itemIndex),
              itemValue,
              ...state.current.slice(itemIndex + 1),
            ]),
          );
        },
      };
    },
    [onChange, itemId],
  );
}
