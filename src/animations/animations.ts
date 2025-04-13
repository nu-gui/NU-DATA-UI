import { easings } from './easings';
import { Variants, Transition } from 'framer-motion';

const createTransition = (baseTransition: Transition, prefersReducedMotion: boolean): Transition => {
  return prefersReducedMotion
    ? { ...baseTransition, duration: 0 }
    : baseTransition;
};

const defaultBaseTransition: Transition = {
  duration: 0.3,
  ease: easings.easeInOut
};

const fastBaseTransition: Transition = {
  duration: 0.15,
  ease: easings.sharp
};

const slowBaseTransition: Transition = {
  duration: 0.5,
  ease: easings.easeOut
};

const createAnimationVariants = (variants: Variants, baseTransition: Transition, prefersReducedMotion: boolean): Variants => {
  const safeVariants = {
    initial: variants.initial || {},
    animate: variants.animate || {},
    exit: variants.exit || {},
    ...variants // Keep any other custom properties
  };
  return {
    ...safeVariants,
    transition: createTransition(baseTransition, prefersReducedMotion)
  };
};

const baseAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
  staggerChildren: {
    animate: {
      transition: { // Stagger doesn't need reduced motion adjustment directly here
        staggerChildren: 0.1
      }
    }
  },
  successState: {
    initial: { backgroundColor: 'transparent' },
    animate: { backgroundColor: 'var(--color-success-100)' }, // Using CSS variable for theme color
  },
  errorState: {
    initial: { backgroundColor: 'transparent' },
    animate: { backgroundColor: 'var(--color-error-100)' }, // Using CSS variable for theme color
  },
  emptyState: {
    initial: { opacity: 0 },
    animate: { opacity: 0.5 },
  }
};

export const getAnimations = (prefersReducedMotion: boolean): Record<string, Variants> => ({
  fadeIn: createAnimationVariants(baseAnimations.fadeIn, defaultBaseTransition, prefersReducedMotion),
  slideUp: createAnimationVariants(baseAnimations.slideUp, defaultBaseTransition, prefersReducedMotion),
  slideDown: createAnimationVariants(baseAnimations.slideDown, defaultBaseTransition, prefersReducedMotion),
  slideLeft: createAnimationVariants(baseAnimations.slideLeft, defaultBaseTransition, prefersReducedMotion),
  slideRight: createAnimationVariants(baseAnimations.slideRight, defaultBaseTransition, prefersReducedMotion),
  scale: createAnimationVariants(baseAnimations.scale, defaultBaseTransition, prefersReducedMotion),
  staggerChildren: baseAnimations.staggerChildren, // Stagger handled differently
  successState: createAnimationVariants(baseAnimations.successState, defaultBaseTransition, prefersReducedMotion),
  errorState: createAnimationVariants(baseAnimations.errorState, defaultBaseTransition, prefersReducedMotion),
  emptyState: createAnimationVariants(baseAnimations.emptyState, defaultBaseTransition, prefersReducedMotion),
});

export const defaultAnimations = getAnimations(false);

export const fadeIn = defaultAnimations.fadeIn;
export const scaleIn = defaultAnimations.scale; // Assuming 'scale' is the intended 'scaleIn'
export const slideUp = defaultAnimations.slideUp;
export const slideDown = defaultAnimations.slideDown;

export default defaultAnimations; // Exporting default state for simpler imports where reduced motion isn't handled
