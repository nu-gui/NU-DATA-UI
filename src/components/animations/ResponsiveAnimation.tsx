import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';

interface ResponsiveAnimationProps {
  children: ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'combined';
  duration?: number;
  delay?: number;
}

export const ResponsiveAnimation: React.FC<ResponsiveAnimationProps> = ({
  children,
  type = 'combined',
  duration = 0.5,
  delay = 0
}) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  
  const animationDuration = isMobile ? duration * 0.7 : isTablet ? duration * 0.85 : duration;
  const animationDelay = isMobile ? delay * 0.5 : delay;
  
  const fadeVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: animationDuration,
        delay: animationDelay,
        ease: 'easeOut'
      }
    }
  };
  
  const slideVariants: Variants = {
    hidden: { 
      x: isMobile ? -20 : isTablet ? -30 : -40,
      opacity: 0 
    },
    visible: { 
      x: 0,
      opacity: 1,
      transition: { 
        duration: animationDuration,
        delay: animationDelay,
        ease: 'easeOut'
      }
    }
  };
  
  const scaleVariants: Variants = {
    hidden: { 
      scale: isMobile ? 0.9 : 0.8,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: animationDuration,
        delay: animationDelay,
        ease: 'easeOut'
      }
    }
  };
  
  const combinedVariants: Variants = {
    hidden: { 
      y: isMobile ? 15 : isTablet ? 25 : 35,
      opacity: 0,
      scale: isMobile ? 0.95 : 0.9
    },
    visible: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { 
        duration: animationDuration,
        delay: animationDelay,
        ease: 'easeOut'
      }
    }
  };
  
  const variants = 
    type === 'fade' ? fadeVariants :
    type === 'slide' ? slideVariants :
    type === 'scale' ? scaleVariants :
    combinedVariants;
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ResponsiveAnimation;
