'use client';

import { ReactNode, useRef } from 'react';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
}

export const ScrollAnimation = ({ children, className }: ScrollAnimationProps) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Reduce animation intensity and respect motion preferences
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        opacity,
        scale,
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
  const { scrollYProgress } = useScroll();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
