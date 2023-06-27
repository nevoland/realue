import { useRef, useCallback } from "../dependencies";

export function useObject<T extends object>(
  value: T = {} as T,
  onChange: (value: T) => void,
) {
  const state = useRef(value);
  state.current = value;
  return useCallback(
    <K extends keyof T>(propertyName: K) => {
      return {
        value: state.current[propertyName],
        name: propertyName,
        key: propertyName,
        onChange: (propertyValue: T[K]): void => {
          onChange(
            (state.current = {
              ...state.current,
              [propertyName]: propertyValue,
            }),
          );
        },
      };
    },
    [onChange],
  );
}
