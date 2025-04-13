import React, { ReactNode, useState, useEffect } from 'react';
import { motion, Variants, Transition } from 'framer-motion';
import useMediaQuery, { breakpoints } from '../../hooks/useMediaQuery';
import useReducedMotion from '../../hooks/useReducedMotion';
import { easings } from '../../animations/easings'; // Import shared easings

interface ResponsiveAnimationProps {
  children: ReactNode;
  type?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'combined'; // Added more slide directions
  duration?: number;
  delay?: number;
  ease?: keyof typeof easings; // Allow specifying easing
  className?: string; // Allow passing className
}

export const ResponsiveAnimation: React.FC<ResponsiveAnimationProps> = ({
  children,
  type = 'combined',
  duration = 0.5,
  delay = 0,
  ease = 'easeOut', // Default easing
  className = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.sm - 1}px)`); // Use imported breakpoints
  const isTablet = useMediaQuery(`(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.lg - 1}px)`);

  useEffect(() => {
    setIsMounted(true); // Component has mounted, safe to render motion
  }, []);

  const animationDuration = prefersReducedMotion ? 0 : (isMobile ? duration * 0.7 : isTablet ? duration * 0.85 : duration);
  const animationDelay = prefersReducedMotion ? 0 : (isMobile ? delay * 0.5 : delay);

  const transition: Transition = {
    duration: animationDuration,
    delay: animationDelay,
    ease: easings[ease] || easings.easeOut, // Use specified or default easing
  };

  const baseVariants: Record<string, Variants> = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition },
    },
    slideUp: {
      hidden: { opacity: 0, y: isMobile ? 15 : isTablet ? 25 : 35 },
      visible: { opacity: 1, y: 0, transition },
    },
    slideDown: {
      hidden: { opacity: 0, y: isMobile ? -15 : isTablet ? -25 : -35 },
      visible: { opacity: 1, y: 0, transition },
    },
    slideLeft: {
      hidden: { opacity: 0, x: isMobile ? 15 : isTablet ? 25 : 35 },
      visible: { opacity: 1, x: 0, transition },
    },
    slideRight: {
      hidden: { opacity: 0, x: isMobile ? -15 : isTablet ? -25 : -35 },
      visible: { opacity: 1, x: 0, transition },
    },
    scale: {
      hidden: { opacity: 0, scale: isMobile ? 0.95 : 0.9 },
      visible: { opacity: 1, scale: 1, transition },
    },
    combined: { // Example: combines slideUp and scale
      hidden: {
        opacity: 0,
        y: isMobile ? 15 : isTablet ? 25 : 35,
        scale: isMobile ? 0.95 : 0.9,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition,
      },
    },
  };

  const selectedVariants = baseVariants[type] || baseVariants.combined;

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden" // Consider if exit animation is always needed or should be optional
      variants={selectedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ResponsiveAnimation;
