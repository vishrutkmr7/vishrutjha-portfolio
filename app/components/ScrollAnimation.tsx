'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { type ReactNode, useRef } from 'react';

import { useIsMobile } from '@/app/lib/hooks';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
}

export const ScrollAnimation = ({ children, className }: ScrollAnimationProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Desktop animation with more pronounced effects
  const desktopOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const desktopScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // Mobile animation with reduced intensity for better performance
  const mobileOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const mobileScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.98, 1, 1, 0.98]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Use less intensive animations on mobile
  const opacity = isMobile ? mobileOpacity : desktopOpacity;
  const scale = isMobile ? mobileScale : desktopScale;

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
        // Use will-change for better performance
        willChange: 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Progress bar component that grows as you scroll
export const ScrollProgressBar = () => {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();

  // Hide on home page only in desktop mode (mobile users may still need to scroll)
  if (prefersReducedMotion || (pathname === '/' && !isMobile)) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-primary"
      style={{
        scaleX: scrollYProgress,
        // Use will-change for better performance
        willChange: 'transform',
      }}
    />
  );
};
