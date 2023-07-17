import { isPromise, useCallback, useEffect, useState } from "../dependencies";

export function usePromise<T>() {
  const { 0: state, 1: onChangeState } = useState<{
    value?: T;
    promise?: Promise<T> | T;
    done: boolean;
    error?: Error;
  }>({ done: true });
  let mounted = false;
  useEffect(() => {
    mounted = true;
    const { promise } = state;
    if (promise === undefined) {
      onChangeState({
        value: undefined,
        promise: undefined,
        done: true,
        error: undefined,
      });
      return;
    }
    if (!isPromise(promise)) {
      onChangeState({
        value: promise,
        promise,
        done: true,
        error: undefined,
      });
      return;
    }
    onChangeState({
      value: undefined,
      promise,
      done: false,
      error: undefined,
    });
    promise.then(
      (value) => {
        if (!mounted) {
          return;
        }
        onChangeState((state) =>
          state.promise !== promise
            ? state
            : { ...state, value, error: undefined, done: true },
        );
        return value;
      },
      (error) => {
        if (!mounted) {
          return;
        }
        onChangeState((state) =>
          state.promise !== promise
            ? state
            : { ...state, value: undefined, error, done: true },
        );
      },
    );
    return () => {
      mounted = false;
    };
  }, [state.promise]);
  const onChange = useCallback(
    (promise?: Promise<T> | T) => {
      onChangeState((state) => ({ ...state, promise }));
    },
    [onChangeState],
  );
  return { ...state, onChange };
}
