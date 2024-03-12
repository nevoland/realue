export type Fetch<T, R> = (
  request: R,
  abortController?: AbortController,
) => Promise<T>;
