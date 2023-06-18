import { useRef, useCallback } from 'react'

export function useObject<T extends object>(
  value: T,
  onChange: (value: T) => void,
) {
  const state = useRef(value);
  state.current = value;
  return useCallback(
    (propertyName: keyof T) => {
      return {
        value: state.current[propertyName],
        name: propertyName,
        onChange: (propertyValue: T[keyof T]): T[keyof T] => {
          onChange(
            (state.current = {
              ...state.current,
              [propertyName]: propertyValue,
            }),
          );
          return propertyValue;
        },
      };
    },
    [onChange],
  );
}