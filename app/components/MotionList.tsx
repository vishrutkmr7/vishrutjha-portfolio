'use client';

import { ReactNode } from 'react';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

interface MotionListProps {
  children: ReactNode;
  className?: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const MotionList = ({ children, className }: MotionListProps) => {
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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

// Helper hook for staggered delays based on index
export const useStaggeredDelay = (index: number, baseDelay: number = 0.1) => ({
  transition: { delay: index * baseDelay },
});

// Gesture animation variants
export const dragVariants = {
  drag: {
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// Draggable card component with gesture animations
export const DraggableCard = motion.div;
