import {
  type PromiseStatus,
  type StateUpdater,
  isPromise,
  useEffect,
  useMemo,
  useState,
} from "../dependencies.js";

type PromiseState<T> = {
  value?: T;
  promise?: Promise<T | undefined> | T;
  status: PromiseStatus;
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
  const observer = useMemo(
    () => attachPromise(onChangeState, promise),
    [promise, onChangeState],
  );
  useEffect(() => observer.dispose, [observer.dispose]);
  return observer.state.promise !== state.promise ? observer.state : state;
}

function attachPromise<T>(
  onChangeState: StateUpdater<PromiseState<T>>,
  promise?: Promise<T> | T,
): { dispose?: () => void; state: PromiseState<T> } {
  let mounted = true;
  if (promise === undefined) {
    return {
      dispose: undefined,
      state: {
        promise: Promise.resolve(undefined),
        reason: undefined,
        status: "idle",
        value: undefined,
      },
    };
  }
  if (!isPromise(promise)) {
    const state = {
      promise: Promise.resolve(promise),
      reason: undefined,
      status: "fulfilled",
      value: promise,
    } as const;
    onChangeState(state);
    return {
      dispose: undefined,
      state,
    };
  }
  const state = {
    promise,
    reason: undefined,
    status: "pending",
    value: undefined,
  } as const;
  onChangeState(state);
  promise.then(
    (value) => {
      if (!mounted) {
        return;
      }
      onChangeState((state) =>
        state.promise !== promise
          ? state
          : { ...state, status: "fulfilled", value },
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
  return {
    dispose: () => {
      mounted = false;
    },
    state,
  };
}
