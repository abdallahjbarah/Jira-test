import { useEffect, useRef, useCallback } from 'react';
import React from 'react';

interface IntersectionObserverTriggerProps {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export const IntersectionObserverTrigger = React.memo(
  ({
    onIntersect,
    enabled = true,
    rootMargin = '0px',
    threshold = 0.1,
    className = '',
  }: IntersectionObserverTriggerProps) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const handleIntersection = useCallback(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      [onIntersect],
    );

    useEffect(() => {
      if (!enabled) {
        // Clean up existing observer if disabled
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
        return;
      }

      // Create new observer
      observerRef.current = new IntersectionObserver(handleIntersection, {
        rootMargin,
        threshold,
      });

      const currentElement = ref.current;
      if (currentElement && observerRef.current) {
        observerRef.current.observe(currentElement);
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    }, [enabled, handleIntersection, rootMargin, threshold]);

    return <div ref={ref} className={className} />;
  },
);

IntersectionObserverTrigger.displayName = 'IntersectionObserverTrigger';
