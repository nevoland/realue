import { useRef, useCallback } from 'react'

export function useArray<T>(
  value: Array<T> = [],
  onChange: (value: Array<T>) => void,
) {
  const state = useRef(value);
  state.current = value;
  return useCallback(
    (itemIndex: number) => {
      return {
        value: state.current[itemIndex],
        name: itemIndex,
        onChange: (itemValue: T): void => {
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
                    ...state.current.slice(itemIndex + 1),
                  ]),
          );
        },
      };
    },
    [onChange],
  );
}