export {
  type JSX,
  type Component,
  type FunctionComponent,
  h as createElement,
  Fragment,
} from "preact";
export { memo } from "preact/compat";
export { debounce, identity } from "lodash-es";
export {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useId,
  useLayoutEffect,
  type StateUpdater,
} from "preact/hooks";
export { useSignal } from "@preact/signals";
export type { PromiseStatus } from "futurise";

export { nanoid as uid } from "nanoid";
export { default as isPromise } from "is-promise";

export {
  setItem,
  setProperty,
  undefinedIfEmpty,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
} from "unchangeable";

export type { DebouncedFunc as DebouncedFunction } from "lodash-es";
