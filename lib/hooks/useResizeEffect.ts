import { getGlobal } from "@nevoland/get-global";

import { EMPTY_OBJECT, useLayoutEffect } from "../dependencies.js";
import type { ResizeEffectOptions } from "../types";

const { ResizeObserver } = getGlobal();

/**
 * Reports changes to the dimensions of an `element` by calling a provided `callback` with that `element`.
 * The `callback` is called once immediately, then each time the dimensions of the `element` or those of an ancestor (when `parents` is set) change.
 * Does nothing if `element` is falsy or if `ResizeObserver` is not available.
 *
 * @param element The element on which to observe resize events.
 * @param callback The callback called with the observed `element`.
 * @param options Observation options: whether to also observe the `parents` of the `element`, and which `box` model to observe on the `element`.
 */
export function useResizeEffect(
  element: Element | null | undefined | false,
  callback: (element: Element) => void,
  options: ResizeEffectOptions = EMPTY_OBJECT,
) {
  const { parents, box } = options;
  useLayoutEffect(() => {
    if (!element || !ResizeObserver) {
      return;
    }
    const observer = new ResizeObserver(() => callback(element));
    callback(element);
    observer.observe(element, box ? { box } : undefined);
    if (parents) {
      let parentElement = element.parentElement;
      while (parentElement != null) {
        observer.observe(parentElement);
        parentElement = parentElement.parentElement;
      }
    }
    return () => observer.disconnect();
  }, [element, callback, parents, box]);
}
