import { AbortError } from "../errors/AbortError";
import { timeout } from "./timeout";

export function sleep(duration: number, signal?: AbortSignal) {
  /*
  Returns a promise that resolves after at least `duration` milliseconds.
  If a `signal` is provided, listens to it to cancel the promise.
  */
  return new Promise((resolve, reject) => {
    const cancelTimer = timeout(duration, resolve);
    signal?.addEventListener("abort", () => {
      cancelTimer();
      reject(new AbortError("Aborted"));
    });
  });
}
