export type Subscribe<Q> = (
  query: Q,
  onRefresh: (query: Q) => void,
) => (() => void) | void;
