# Component Integration Template

## Overview
This document provides a template for integrating Figma design components into the NU-DATA-UI application. It outlines the process from extraction to implementation, testing, and documentation.

## Prerequisites
- Access to the nu-data-design repository
- Access to the NU-DATA-UI repository
- Figma VS Code extension installed
- Figma credentials (API token or email/password)

## Step 1: Component Identification and Extraction

### 1.1 Identify Component in Figma
- Open the Figma file using the VS Code extension
- Locate the component in the Figma file structure
- Examine component properties, variants, and styles

### 1.2 Extract Component from Figma
- Use the Figma VS Code extension to export the component as React/Tailwind
- Save the exported component to the nu-data-design repository:
  ```
  /design-data/manual-extraction/components/{component_type}/{component_name}.jsx
  ```
- Export any associated assets to:
  ```
  /design-data/manual-extraction/assets/{component_type}/{component_name}/
  ```

### 1.3 Update Manual Extraction Registry
- Add the component to the manual extraction registry:
  ```
  /design-data/manual-extraction/manual-extraction-registry.json
  ```
- Include component ID, name, type, extraction date, and status

## Step 2: Component Enhancement

### 2.1 Convert to TypeScript
- Rename the file from `.jsx` to `.tsx`
- Add TypeScript interfaces for component props
- Add proper type annotations

### 2.2 Enhance with Tailwind CSS
- Replace any inline styles with Tailwind CSS classes
- Ensure responsive design with appropriate Tailwind breakpoint classes
- Add dark mode support with dark: variant classes

### 2.3 Add Animation Support
- Integrate with the ResponsiveAnimation component
- Add appropriate animation types (fade, slide, scale)
- Ensure animations respect user preferences (prefers-reduced-motion)

## Step 3: Component Integration

### 3.1 Create Component in NU-DATA-UI
- Create a new file in the appropriate directory:
  ```
  /src/components/{category}/{ComponentName}.tsx
  ```
- Implement the component using the enhanced Tailwind version
- Add proper imports and exports

### 3.2 Add Props and Variants
- Define a comprehensive props interface
- Implement all required variants
- Add default prop values
- Document props with JSDoc comments

### 3.3 Add Accessibility Features
- Ensure proper ARIA attributes
- Add keyboard navigation support
- Verify color contrast meets WCAG standards
- Test with screen readers

## Step 4: Testing and Validation

### 4.1 Create Test Component
- Create a test component to validate the implementation:
  ```
  /src/components/{category}/{ComponentName}Test.tsx
  ```
- Include examples of all variants and configurations
- Test responsive behavior
- Verify accessibility compliance

### 4.2 Create Demo Component
- Create a demo component to showcase the implementation:
  ```
  /src/components/{category}/{ComponentName}Demo.tsx
  ```
- Include examples of common use cases
- Demonstrate integration with other components

### 4.3 Validate Against Design
- Compare the implemented component with the Figma design
- Verify visual properties (colors, typography, spacing)
- Check responsive behavior
- Validate animations and interactions

### 4.4 Document Validation Results
- Create a validation report:
  ```
  /devin/logs/{component-name}-validation.md
  ```
- Include comparison tables for design fidelity
- Document any discrepancies and resolutions

## Step 5: Documentation

### 5.1 Update Component Feature Matrix
- Add the component to the component feature matrix:
  ```
  /devin/logs/component-feature-matrix.md
  ```
- Include implementation status, priority, and notes

### 5.2 Update Implementation Gaps and Priorities
- Update the implementation gaps and priorities document:
  ```
  /devin/logs/implementation-gaps-priorities.md
  ```
- Adjust priorities based on the newly implemented component

### 5.3 Create Component Documentation
- Create documentation for the component:
  ```
  /docs/components/{component-name}.md
  ```
- Include usage examples, props documentation, and best practices

## Example: Card Component Integration

### Component Identification
- Component: Card
- Figma Component ID: component_id_3
- Priority: High
- Location in Figma: Components > UI Elements > Cards > Card/Default

### Extraction Process
1. Used Figma VS Code extension to export the Card component
2. Saved to `/design-data/manual-extraction/components/card/card-default.jsx`
3. Enhanced with Tailwind CSS in `/design-data/manual-extraction/components/card/card-default-tailwind.jsx`

### Integration Process
1. Created Card component in NU-DATA-UI at `/src/components/elements/Card.tsx`
2. Added TypeScript interface for props:
   ```typescript
   interface CardProps {
     children: React.ReactNode;
     title?: string;
     className?: string;
     variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
     elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
     rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
     padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
     animate?: boolean;
     animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
     onClick?: () => void;
   }
   ```
3. Implemented variants using Tailwind CSS classes
4. Added animation support with ResponsiveAnimation component
5. Added dark mode support with dark: variant classes
6. Created demo and test components

### Validation Results
- Design fidelity: ✅ Matches Figma design
- Responsive behavior: ✅ Works across all breakpoints
- Accessibility: ✅ Meets WCAG AA standards
- Animation: ✅ Matches design specifications
- Dark mode: ✅ Properly supports dark mode

### Documentation
- Updated component feature matrix
- Updated implementation gaps and priorities
- Created validation report at `/devin/logs/card-component-validation.md`

## Conclusion
This template provides a standardized process for integrating Figma design components into the NU-DATA-UI application. By following this process, we ensure consistent implementation, proper testing, and comprehensive documentation for all components.
