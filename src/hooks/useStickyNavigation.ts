"use client";

import { useEffect, useRef, useState } from "react";

interface UseStickyNavigationOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useStickyNavigation(
  itemCount: number,
  options: UseStickyNavigationOptions = {}
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLElement>(null);

  // Destructure options to avoid dependency issues
  const { threshold = 0.3, rootMargin = "-30% 0px -30% 0px" } = options;

  // Set ref for a specific item
  const setItemRef = (index: number) => (el: HTMLElement | null) => {
    itemRefs.current[index] = el;
  };

  useEffect(() => {
    const currentRefs = itemRefs.current;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let maxIntersectionRatio = 0;
        let activeEntryIndex = -1;

        entries.forEach((entry) => {
          const index = currentRefs.findIndex((ref) => ref === entry.target);
          if (index !== -1 && entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            activeEntryIndex = index;
          }
        });

        // Only update if we found a valid entry with significant intersection
        if (activeEntryIndex !== -1 && maxIntersectionRatio > threshold) {
          setActiveIndex(activeEntryIndex);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin,
      }
    );

    // Observe all item refs
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [itemCount, threshold, rootMargin]);

  const scrollToItem = (index: number) => {
    const item = itemRefs.current[index];
    if (item) {
      item.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return {
    activeIndex,
    setItemRef,
    scrollToItem,
    containerRef,
  };
}
