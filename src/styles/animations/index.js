/**
 * Animation utilities for NU-DATA-UI
 * Adapted from nu-data-design
 */

import { easings } from './easings';

export const animations = {
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
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};

export const transitions = {
  default: {
    duration: 0.3,
    ease: easings.easeInOut,
  },
  slow: {
    duration: 0.6,
    ease: easings.easeInOut,
  },
  fast: {
    duration: 0.15,
    ease: easings.easeInOut,
  },
};

export const staggerChildren = {
  default: {
    staggerChildren: 0.1,
  },
  fast: {
    staggerChildren: 0.05,
  },
  slow: {
    staggerChildren: 0.2,
  },
};
