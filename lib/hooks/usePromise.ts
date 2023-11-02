import {
  type StateUpdater,
  isPromise,
  useEffect,
  useState,
} from "../dependencies";

type PromiseState<T> = {
  value?: T;
  promise?: Promise<T> | T;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  reason?: Error;
};

/**
 * Returns a promise state object to track the provided `promise`.
 * Ignores outdated promises or ones that resolve when the component got unmounted.
 *
 * @param promise The promise to track.
 * @returns A promise state object
 */
export function usePromise<T>(promise?: Promise<T> | T) {
  const { 0: state, 1: onChangeState } = useState<PromiseState<T>>({
    status: "idle",
  });
  useEffect(
    () => attachPromise(onChangeState, promise),
    [promise, onChangeState],
  );
  return state;
}

function attachPromise<T>(
  onChangeState: StateUpdater<PromiseState<T>>,
  promise?: Promise<T> | T,
) {
  let mounted = true;
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
      if (!mounted) {
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
      if (!mounted) {
        return;
      }
      onChangeState((state) =>
        state.promise !== promise
          ? state
          : { ...state, reason, status: "rejected" },
      );
    },
  );
  return () => {
    mounted = false;
  };
}
