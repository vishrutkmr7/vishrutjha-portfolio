'use client';

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

import { useIsMobile } from '@/app/lib/hooks';

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

// Mobile-optimized container with reduced stagger
const mobileContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.05,
    },
  },
};

export const MotionList = ({ children, className }: MotionListProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = isMobile ? mobileContainer : container;

  return (
    <LayoutGroup>
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        layout
      >
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
      type: 'spring' as const,
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

// Mobile-optimized variants with reduced motion
export const mobileScaleInVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
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
      type: 'spring' as const,
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

// Gesture animation variants with mobile optimization
export const dragVariants = {
  drag: {
    scale: 1.01,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
    },
  },
};

// Mobile-optimized drag variants
export const mobileDragVariants = {
  drag: {
    scale: 1.005,
    transition: {
      duration: 0.15,
    },
  },
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.15,
    },
  },
};

// Draggable card component with gesture animations
export const DraggableCard = motion.div;
