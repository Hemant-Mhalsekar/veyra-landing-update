import { useEffect, useState } from "react";

const DEFAULT_OPTIONS = {
  threshold:   0.15,
  rootMargin:  "0px 0px -10% 0px",
};

/**
 * Observes a ref element and returns whether it is currently in the viewport.
 * Visibility resets to false when the element leaves, so Framer Motion
 * animations replay on every scroll-in.
 *
 * @param {React.RefObject} ref - Ref attached to the target element.
 * @param {IntersectionObserverInit} [options] - Optional observer options.
 * @returns {{ isVisible: boolean }}
 */
export function useScrollReveal(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, mergedOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.rootMargin]);

  return { isVisible };
}
