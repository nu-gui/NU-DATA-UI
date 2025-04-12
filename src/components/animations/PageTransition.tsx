import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animations } from '../../animations/animations';

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
  const selectedAnimation = animations[animation];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial={selectedAnimation.initial}
        animate={selectedAnimation.animate}
        exit={selectedAnimation.exit}
        transition={selectedAnimation.transition}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
