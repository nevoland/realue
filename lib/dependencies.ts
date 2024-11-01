export { h as createElement, createContext, Fragment } from "preact";
export { memo } from "preact/compat";
export {
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useId,
  useLayoutEffect,
} from "preact/hooks";
export { useSignal } from "@preact/signals";

export { timeout, sleep } from "futurise";

export { nanoid as uid } from "nanoid";
export { default as isPromise } from "is-promise";

export {
  setItem,
  setProperty,
  undefinedIfEmpty,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
} from "unchangeable";

export function identity<T>(value: T): T {
  return value;
}

export function noop() {}
