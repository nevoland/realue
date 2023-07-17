import * as JSX from "react";

export { JSX };

export {
  memo,
  useRef,
  useCallback,
  useState,
  useEffect,
  useMemo,
  useId,
} from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

export function render(element: JSX.ReactElement, rootElement: HTMLElement) {
  return createRoot(rootElement).render(<StrictMode>{element}</StrictMode>);
}

export { useSignal } from "@preact/signals-react";

export { nanoid as uid } from "nanoid";
export { default as isPromise } from "is-promise";
