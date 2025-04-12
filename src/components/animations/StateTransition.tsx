import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animations } from '../../animations/animations';

type StateType = 'idle' | 'loading' | 'success' | 'error' | 'empty';

interface StateTransitionProps {
  state: StateType;
  children: ReactNode;
  className?: string;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  emptyComponent?: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
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
  const selectedAnimation = animations[animation];

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {state === 'loading' && (
          <motion.div
            key="loading"
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            exit={selectedAnimation.exit}
            transition={selectedAnimation.transition}
          >
            {loadingComponent}
          </motion.div>
        )}
        {state === 'error' && (
          <motion.div
            key="error"
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            exit={selectedAnimation.exit}
            transition={selectedAnimation.transition}
          >
            {errorComponent}
          </motion.div>
        )}
        {state === 'empty' && (
          <motion.div
            key="empty"
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            exit={selectedAnimation.exit}
            transition={selectedAnimation.transition}
          >
            {emptyComponent}
          </motion.div>
        )}
        {(state === 'idle' || state === 'success') && (
          <motion.div
            key="content"
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            exit={selectedAnimation.exit}
            transition={selectedAnimation.transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StateTransition;
