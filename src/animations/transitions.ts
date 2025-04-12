import { easings } from './easings';

export const transitions = {
  default: {
    duration: 0.3,
    easing: easings.easeInOut
  },
  fast: {
    duration: 0.15,
    easing: easings.sharp
  },
  slow: {
    duration: 0.5,
    easing: easings.easeOut
  },
  pageTransition: {
    duration: 0.4,
    easing: easings.easeOut
  },
  hover: {
    duration: 0.2,
    easing: easings.easeOut
  },
  tap: {
    duration: 0.1,
    easing: easings.sharp
  }
};

export default transitions;
