import { getGlobal } from "@nevoland/get-global";

import { EMPTY_OBJECT, useLayoutEffect } from "../dependencies.js";
import type { ResizeEffectOptions } from "../types";

const { ResizeObserver, requestAnimationFrame, cancelAnimationFrame } =
  getGlobal();

/**
 * Reports changes to the dimensions of the border box of an `element` by calling a provided `callback` with that `element`.
 *
 * @param element The element on which to observe resize events.
 * @param callback The callback called with the observed `element` when its dimensions or those of an ancestor (when `parents` is set) change.
 * @param options Observation options.
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
    let animationFrame: number | undefined = undefined;
    const observer = new ResizeObserver(() => {
      if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
      }
      animationFrame = requestAnimationFrame(() => {
        callback(element);
        animationFrame = undefined;
      });
    });
    callback(element);
    observer.observe(element, box ? { box } : undefined);
    if (parents) {
      let parentElement = element.parentElement;
      while (parentElement != null) {
        observer.observe(parentElement);
        parentElement = parentElement.parentElement;
      }
    }
    return () => {
      observer.disconnect();
      if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [element, callback, parents, box]);
}
