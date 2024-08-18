import { getGlobal } from "@nevoland/get-global";

import { EMPTY_ARRAY, EMPTY_OBJECT, useLayoutEffect } from "../dependencies.js";
import type { ResizeEffectOptions } from "../types";

const { ResizeObserver, requestAnimationFrame } = getGlobal();

/**
 * Reports changes to the dimensions of the border box of an `element` by calling a provided `callback`.
 *
 * @param element The element on which to observe resize events.
 * @param callback The callback called by the observer with the mutation list and the observer.
 * @param options Observation options.
 */
export function useResizeEffect(
  element: Element | null | undefined | false,
  callback: ResizeObserverCallback,
  options: ResizeEffectOptions = EMPTY_OBJECT,
) {
  const { parents, box } = options;
  useLayoutEffect(() => {
    if (!element || !ResizeObserver) {
      return;
    }
    let calling = false;
    const observer = new ResizeObserver((mutationList, observer) => {
      if (calling) {
        return;
      }
      calling = true;
      requestAnimationFrame(() => {
        callback(mutationList, observer);
        calling = false;
      });
    });
    callback(EMPTY_ARRAY as ResizeObserverEntry[], observer);
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
