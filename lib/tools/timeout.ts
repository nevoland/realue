const MAX_TIMEOUT = 2147483647;

export function timeout(
  duration: number,
  callback: (...args: unknown[]) => void,
) {
  /*
  Calls `callback` after at least `duration` milliseconds. Returns a function that cancels the future call of `callback`, if not already called.
  */
  if (!duration && requestAnimationFrame && cancelAnimationFrame) {
    const timer = requestAnimationFrame(callback);
    return () => {
      cancelAnimationFrame(timer);
    };
  }
  let timer: NodeJS.Timeout | undefined = setTimeout(
    () => {
      timer = undefined;
      callback();
    },
    duration > MAX_TIMEOUT ? MAX_TIMEOUT : duration,
  );
  return () => {
    if (timer === undefined) {
      return;
    }
    clearTimeout(timer);
    timer = undefined;
  };
}
