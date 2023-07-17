import { type StateUpdater } from "preact/hooks";
import {
  isPromise,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "../dependencies";

type PromiseState<T> = {
  value?: T;
  promise?: Promise<T> | T;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  reason?: Error;
};

export function usePromise<T>() {
  const { 0: state, 1: onChangeState } = useState<PromiseState<T>>({
    status: "idle",
  });
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const onChange = useCallback(
    (promise?: Promise<T> | T) => {
      attachPromise(mounted, onChangeState, promise);
    },
    [onChangeState],
  );
  return { ...state, onChange };
}

function attachPromise<T>(
  mounted: { current: boolean },
  onChangeState: StateUpdater<PromiseState<T>>,
  promise?: Promise<T> | T,
) {
  if (promise === undefined) {
    onChangeState({
      value: undefined,
      promise: undefined,
      status: "idle",
      reason: undefined,
    });
    return;
  }
  if (!isPromise(promise)) {
    onChangeState((state) =>
      state.value === promise
        ? state
        : {
            value: promise,
            promise,
            status: "fulfilled",
            reason: undefined,
          },
    );
    return;
  }
  let currentPromise: Promise<T> | T | undefined;
  onChangeState((state) =>
    (currentPromise = state.promise) === promise
      ? state
      : {
          value: undefined,
          promise,
          status: "pending",
          reason: undefined,
        },
  );
  if (currentPromise === promise) {
    return;
  }
  promise.then(
    (value) => {
      if (!mounted.current) {
        return;
      }
      onChangeState((state) =>
        state.promise !== promise
          ? state
          : { ...state, value, status: "fulfilled" },
      );
      return value;
    },
    (reason) => {
      if (!mounted.current) {
        return;
      }
      onChangeState((state) =>
        state.promise !== promise
          ? state
          : { ...state, reason, status: "rejected" },
      );
    },
  );
}
