'use client';

import { useEffect, useState } from 'react';

// Shared mobile detection hook with debouncing and optimizations
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // Only run on client side
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || 'ontouchstart' in window;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkMobile = () => {
      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Debounce the check to avoid excessive updates
      timeoutId = setTimeout(() => {
        const newIsMobile = window.innerWidth < 768 || 'ontouchstart' in window;
        setIsMobile(prevIsMobile => {
          // Only update state if the value actually changed
          return prevIsMobile !== newIsMobile ? newIsMobile : prevIsMobile;
        });
      }, 100);
    };

    // Initial check
    checkMobile();

    // Add event listener with passive option for better performance
    window.addEventListener('resize', checkMobile, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return isMobile;
}

// Shared reduced motion hook
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

// Shared intersection observer hook for performance
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}
