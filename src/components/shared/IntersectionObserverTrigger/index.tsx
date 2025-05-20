import { useEffect, useRef } from 'react';

interface IntersectionObserverTriggerProps {
  onIntersect: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export const IntersectionObserverTrigger = ({
  onIntersect,
  enabled = true,
  rootMargin = '0px',
  threshold = 0.1,
  className = '',
}: IntersectionObserverTriggerProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin, threshold },
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [enabled, onIntersect, rootMargin, threshold]);

  return <div ref={ref} className={className} />;
};
