import {
  type Dispatch,
  type StateUpdater,
  isPromise,
  timeout,
  useEffect,
  useMemo,
  useState,
} from "../dependencies.js";
import type { PromiseState } from "../types.js";

/**
 * Returns a promise state object to track the provided `promise`.
 * Ignores outdated promises or ones that resolve when the component got unmounted.
 * Non-promise values are immediately resolved, avoiding a second render.
 *
 * @param promise The promise to track.
 * @returns A promise state object.
 */
export function usePromise<T>(promise?: Promise<T> | T) {
  const [state, onChangeState] = useState<PromiseState<T>>({
    status: "idle",
  });
  const observer = useMemo(
    () => attachPromise(onChangeState, promise),
    [promise, onChangeState],
  );
  useEffect(() => observer.dispose, [observer.dispose]);
  if (observer.state.promise !== state.promise) {
    return observer.state;
  }
  return state;
}

function attachPromise<T>(
  onChangeState: Dispatch<StateUpdater<PromiseState<T>>>,
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
    return {
      dispose: undefined,
      state,
    };
  }
  const state: PromiseState<T> = {
    status: "pending",
    promise,
    value: undefined,
    reason: undefined,
  };
  timeout(0, () => {
    onChangeState(state);
    promise.then(
      (value) => {
        if (!mounted) {
          return;
        }
        onChangeState((state) =>
          state.promise !== promise
            ? state
            : { status: "fulfilled", promise, value, reason: undefined },
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
            : { status: "rejected", promise, value: undefined, reason },
        );
      },
    );
  });
  return {
    dispose: () => {
      mounted = false;
    },
    state,
  };
}
