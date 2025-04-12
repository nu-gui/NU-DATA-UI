import { easings } from './easings';

const defaultTransition = {
  duration: 0.3,
  ease: easings.easeInOut
};

const fastTransition = {
  duration: 0.15,
  ease: easings.sharp
};

const slowTransition = {
  duration: 0.5,
  ease: easings.easeOut
};

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: defaultTransition
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: defaultTransition
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: defaultTransition
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: defaultTransition
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: defaultTransition
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
    transition: defaultTransition
  },
  staggerChildren: {
    animate: { 
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  },
  successState: {
    initial: { backgroundColor: 'transparent' },
    animate: { backgroundColor: '#d1fae5' },
    transition: defaultTransition
  },
  errorState: {
    initial: { backgroundColor: 'transparent' },
    animate: { backgroundColor: '#fee2e2' },
    transition: defaultTransition
  },
  emptyState: {
    initial: { opacity: 0 },
    animate: { opacity: 0.5 },
    transition: defaultTransition
  }
};

export default animations;
