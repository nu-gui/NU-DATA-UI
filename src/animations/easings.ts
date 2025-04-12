/**
 * Custom easing functions for animations
 * Based on the design system from nu-data-design
 */

export const easings = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
  
  bounce: [0.175, 0.885, 0.32, 1.275],
  elastic: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.25, 0.1, 0.25, 1],
  
  buttonHover: [0.25, 0.46, 0.45, 0.94],
  cardReveal: [0.16, 1, 0.3, 1],
  modalEnter: [0.34, 1.56, 0.64, 1],
  modalExit: [0.36, 0, 0.66, -0.56],
};

export default easings;
