import { useRef, useCallback } from "../dependencies";

export function useArrayMutator<T>({
  value = [],
  onChange,
}: {
  value: T[];
  onChange?: (value: T[]) => void;
}) {
  const state = useRef(value);
  state.current = value;
  return useCallback(
    (itemIndex: number, itemValue?: T) => {
      onChange?.(
        (state.current =
          itemValue === undefined
            ? [
                ...state.current.slice(0, itemIndex),
                ...state.current.slice(itemIndex + 1),
              ]
            : [
                ...state.current.slice(0, itemIndex),
                itemValue,
                ...state.current.slice(itemIndex),
              ]),
      );
    },
    [onChange],
  );
}
