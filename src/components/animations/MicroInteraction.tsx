import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MicroInteractionProps {
  children: ReactNode;
  type?: 'hover' | 'tap' | 'both';
  className?: string;
}

export const MicroInteraction: React.FC<MicroInteractionProps> = ({
  children,
  type = 'both',
  className = '',
}) => {
  const hoverAnimation = type === 'hover' || type === 'both' 
    ? { scale: 1.02, transition: { duration: 0.2 } } 
    : undefined;
    
  const tapAnimation = type === 'tap' || type === 'both' 
    ? { scale: 0.98, transition: { duration: 0.1 } } 
    : undefined;

  return (
    <motion.div
      className={className}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
    >
      {children}
    </motion.div>
  );
};

export default MicroInteraction;
