import { useCallback, useLayoutEffect, useState } from "../dependencies.js";
import type { ErrorReport, NevoProps } from "../types.js";

/**
 * Creates a local state of `value` and `error` values and syncs them with the parent `props`.
 * Usefull if you need to handle a local state while ensuring that new values provided from the parent component are taken into consideration, or to let the parent know about `value` and `error` changes.
 *
 * @param props Properties according to the Nevo pattern.
 * @returns Properties according to the Nevo pattern.
 */
export function useSyncedProps<T>(
  props: NevoProps<T>,
): Pick<NevoProps<T>, "name" | "error" | "value"> &
  Required<Pick<NevoProps<T>, "onChange" | "onChangeError">> {
  const [value, onChangeValueState] = useState<T>(props.value);
  const { name } = props;
  useLayoutEffect(() => {
    onChangeValueState(props.value);
  }, [props.value]);
  const onChange = useCallback(
    (value: T) => {
      onChangeValueState(value);
      props.onChange?.(value, name);
    },
    [props.onChange, name],
  );
  const [error, onChangeErrorState] = useState<ErrorReport<T> | undefined>(
    props.error,
  );
  useLayoutEffect(() => {
    onChangeErrorState(props.error);
  }, [props.error]);
  const onChangeError = useCallback(
    (error: ErrorReport<T> | undefined) => {
      onChangeErrorState(error);
      props.onChangeError?.(error, name);
    },
    [props.onChangeError, name],
  );
  return { error, name, onChange, onChangeError, value };
}
