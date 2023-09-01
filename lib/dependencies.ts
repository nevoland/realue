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
} from "preact/hooks";
export { useSignal } from "@preact/signals";

export { nanoid as uid } from "nanoid";
export { default as isPromise } from "is-promise";
