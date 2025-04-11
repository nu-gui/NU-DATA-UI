# 🎨 Figma to React/Tailwind Export Playbook

## Overview
This playbook guides Devin through exporting Figma designs to React components with Tailwind CSS styling, with special emphasis on preserving animations and interactive elements. The process ensures your UI Portals match the design as closely as possible.

## Prerequisites

### Credentials
```
FIGMA_CREDENTIALS:
  EMAIL: your-figma-email@example.com
  PASSWORD: your-figma-password
  API_TOKEN: your-figma-api-token
```

### Repository Information
- GitHub Repository: `{GITHUB_REPO}` (e.g., "username/ui-portal")
- Figma File URL: `{FIGMA_FILE_URL}` (e.g., "https://www.figma.com/file/abcdef123456/UI-Portal-Design")

## Step-by-Step Process

### 1. Authentication & Project Setup

```bash
# Install required tools
npm install -g @figma/api figma-api-exporter figma-tokens
npm install react react-dom tailwindcss postcss autoprefixer framer-motion gsap

# Set up project structure
mkdir -p src/{components,animations,styles,assets,hooks}
```

### 2. Design Analysis

```bash
# Extract Figma file information
npx figma-api export --file-key={FIGMA_FILE_ID} --format=json --output=design-data

# Analyze design system
node scripts/analyze-design-system.js
```

### 3. Export Design Tokens

```bash
# Extract colors, typography, spacing, etc.
npx figma-tokens-transformer --file={FIGMA_FILE_ID} --token={FIGMA_API_TOKEN} --output=src/styles/tokens

# Generate Tailwind config
node scripts/generate-tailwind-config.js
```

### 4. Component Extraction

```bash
# Export components with proper naming
npx figma-to-react --file={FIGMA_FILE_ID} --output=src/components --format=tsx

# Process component variants
node scripts/process-component-variants.js
```

### 5. Animation Extraction (Critical)

```bash
# Extract Smart Animate transitions
npx figma-animation-extractor --file={FIGMA_FILE_ID} --output=src/animations/transitions

# Extract hover states and micro-interactions
npx figma-interaction-extractor --file={FIGMA_FILE_ID} --output=src/animations/interactions

# Generate animation utilities
node scripts/generate-animation-utilities.js
```

### 6. Code Generation

```bash
# Generate React components with animations
npx figma-to-react-animated --file={FIGMA_FILE_ID} --output=src/components --with-animations

# Create animation hooks
node scripts/create-animation-hooks.js
```

### 7. Integration & Testing

```bash
# Set up Storybook for component testing
npx sb init
npm run storybook

# Generate animation examples
node scripts/generate-animation-stories.js
```

## Animation Implementation Guide

### Types of Animations to Extract

1. **Page Transitions**
   - Entry/exit animations
   - Route change animations
   - Loading states

2. **Micro-interactions**
   - Hover effects
   - Click/tap responses
   - Focus states
   - Form interactions

3. **Content Animations**
   - Scrolling effects
   - Parallax
   - Progressive disclosure
   - Data visualization animations

4. **State Transitions**
   - Loading states
   - Error states
   - Success states
   - Empty states

### Implementation Approaches

#### 1. CSS Animations
```jsx
// Example of extracted CSS animation
const Button = () => (
  <button className="transition-all duration-300 hover:scale-105 active:scale-95">
    Click Me
  </button>
);
```

#### 2. Framer Motion
```jsx
// Example of complex animation using Framer Motion
import { motion } from 'framer-motion';

const Card = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    Card Content
  </motion.div>
);
```

#### 3. GSAP for Complex Animations
```jsx
// Example of GSAP timeline animation
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ComplexAnimation = () => {
  const elementRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    
    const tl = gsap.timeline();
    tl.from(element, { opacity: 0, y: 50, duration: 0.5 })
      .to(element, { rotation: 360, duration: 1 })
      .to(element, { scale: 1.2, duration: 0.3 })
      .to(element, { scale: 1, duration: 0.3 });
      
    return () => tl.kill();
  }, []);
  
  return <div ref={elementRef} className="w-20 h-20 bg-blue-500"></div>;
};
```

## Timing Functions & Easing

Extract and implement custom timing functions from Figma:

```js
// src/animations/easings.js
export const easings = {
  easeInOut: [0.42, 0, 0.58, 1],
  easeOut: [0, 0, 0.58, 1],
  easeIn: [0.42, 0, 1, 1],
  // Custom easings from Figma
  bounce: [0.175, 0.885, 0.32, 1.275],
  // Add all custom easings from your design
};
```

## Responsive Animation Considerations

```jsx
// Example of responsive animation
import { useMediaQuery } from '../hooks/useMediaQuery';

const ResponsiveAnimation = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: isMobile ? 0 : 50,
        scale: isMobile ? 1 : 1.2
      }}
      transition={{ 
        duration: isMobile ? 0.3 : 0.5
      }}
    >
      Content
    </motion.div>
  );
};
```

## Performance Optimization

```jsx
// Example of optimized animation
import { LazyMotion, domAnimation, m } from 'framer-motion';

const OptimizedAnimation = () => (
  <LazyMotion features={domAnimation}>
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Optimized Animation
    </m.div>
  </LazyMotion>
);
```

## Validation Checklist

- [ ] All components exported successfully
- [ ] Design tokens match Figma specifications
- [ ] Animations match Figma prototypes
- [ ] Components render correctly at all breakpoints
- [ ] Interactions work as expected
- [ ] Performance is optimized
- [ ] Accessibility standards maintained
- [ ] Documentation generated for all components

## Troubleshooting

### Common Issues

1. **Missing Animations**
   - Check if animations are enabled in the Figma file
   - Verify Smart Animate is used for transitions
   - Ensure all frames have proper naming

2. **Performance Issues**
   - Use `will-change` CSS property sparingly
   - Implement throttling for scroll animations
   - Consider using CSS animations for simple effects

3. **Responsive Breakpoints**
   - Verify breakpoints match Figma frames
   - Implement responsive animations using media queries
   - Test on actual devices

## Integration with Existing Codebase

```bash
# Merge with existing components
node scripts/merge-components.js

# Update Tailwind config
npx tailwindcss init -p --full
```

## Final Delivery

```bash
# Generate documentation
npm run generate-docs

# Build component library
npm run build

# Commit to repository
git add .
git commit -m "Add Figma-exported components with animations"
git push origin main
```

Replace all variables in `{CURLY_BRACES}` with your specific project details before starting the session.
