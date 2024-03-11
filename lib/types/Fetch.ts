export type Fetch<T> = (
  request: any,
  abortController?: AbortController,
) => Promise<T>;
