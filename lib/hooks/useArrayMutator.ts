import { useRef, useMemo } from "../dependencies";
import { Name } from "../types";

export function useArrayMutator<T>({
  name,
  value = [],
  onChange,
}: {
  name: Name;
  value?: T[];
  onChange?: (value: T[], name: Name) => void;
}) {
  const state = useRef(value);
  state.current = value;
  return useMemo(
    () =>
      onChange === undefined
        ? undefined
        : (itemIndex: number, itemValue?: T) => {
            onChange(
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
              name,
            );
          },
    [onChange, name],
  );
}
