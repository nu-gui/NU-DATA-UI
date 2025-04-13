import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnimations } from '../../animations/animations'; // Correct import
import useReducedMotion from '../../hooks/useReducedMotion'; // Import useReducedMotion

interface PageTransitionProps {
  children: ReactNode;
  transitionKey: string | number;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  transitionKey,
  className = '',
  animation = 'fadeIn',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const animations = getAnimations(prefersReducedMotion); // Get motion-aware animations
  const selectedAnimation = animations[animation]; // Select the specific animation variant

  const animationProps = selectedAnimation ? {
    initial: selectedAnimation.initial,
    animate: selectedAnimation.animate,
    exit: selectedAnimation.exit,
    transition: selectedAnimation.transition as any // Cast transition to any temporarily
  } : { // Fallback
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: prefersReducedMotion ? 0 : 0.3 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        {...animationProps}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
