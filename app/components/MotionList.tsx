'use client';

import { ReactNode } from 'react';

import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion';

interface MotionListProps {
  children: ReactNode;
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const MotionList = ({ children, className }: MotionListProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LayoutGroup>
      <motion.div className={className} variants={container} initial="hidden" animate="show" layout>
        <AnimatePresence mode="popLayout">{children}</AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
};

export const MotionItem = motion.div;

// Preset variants for different animation styles
export const fadeInVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 8,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.15,
    },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
    },
  },
};

// Helper hook for staggered delays based on index
export const useStaggeredDelay = (index: number, baseDelay: number = 0.05) => ({
  transition: { delay: index * baseDelay },
});

// Gesture animation variants
export const dragVariants = {
  drag: {
    scale: 1.01,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

// Draggable card component with gesture animations
export const DraggableCard = motion.div;
