import React, { ReactNode } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import { getAnimations } from '../../animations/animations'; // Import getAnimations
import useReducedMotion from '../../hooks/useReducedMotion'; // Import useReducedMotion

type StateType = 'idle' | 'loading' | 'success' | 'error' | 'empty';
type AnimationType = keyof ReturnType<typeof getAnimations>; // Use keys from getAnimations return type

interface StateTransitionProps {
  state: StateType;
  children: ReactNode;
  className?: string;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
  animation?: AnimationType; // Use the derived AnimationType
}

export const StateTransition: React.FC<StateTransitionProps> = ({
  state,
  children,
  className = '',
  loadingComponent = <div className="p-4 text-center">Loading...</div>,
  errorComponent = <div className="p-4 text-center text-error-500">Error occurred</div>,
  emptyComponent = <div className="p-4 text-center text-gray-500">No data available</div>,
  animation = 'fadeIn',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const animations = getAnimations(prefersReducedMotion); // Get motion-aware animations
  const selectedAnimation = animations[animation]; // Select the specific animation variant

  const animationProps = selectedAnimation ? {
    initial: selectedAnimation.initial,
    animate: selectedAnimation.animate,
    exit: selectedAnimation.exit,
    transition: selectedAnimation.transition as Transition // Cast transition to Transition type
  } : { // Fallback if animation key is invalid (shouldn't happen with AnimationType)
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: prefersReducedMotion ? 0 : 0.3 }
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {state === 'loading' && (
          <motion.div
            key="loading"
            {...animationProps}
          >
            {loadingComponent}
          </motion.div>
        )}
        {state === 'error' && (
          <motion.div
            key="error"
            {...animationProps}
          >
            {errorComponent}
          </motion.div>
        )}
        {state === 'empty' && (
          <motion.div
            key="empty"
            {...animationProps}
          >
            {emptyComponent}
          </motion.div>
        )}
        {(state === 'idle' || state === 'success') && (
          <motion.div
            key="content"
            {...animationProps}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StateTransition;
