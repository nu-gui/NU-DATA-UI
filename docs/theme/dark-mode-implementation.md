# Dark Mode Implementation

This document outlines the dark mode implementation strategy for the NU-DATA-UI project.

## Architecture

The dark mode implementation uses a combination of:

1. **CSS Variables**: Defined in `src/styles/theme-variables.css`
2. **Tailwind Dark Mode**: Using Tailwind's dark mode variant
3. **React Context**: For application-wide theme state management

## Color Tokens

Color tokens are sourced from the nu-data-design repository and synchronized with the CSS variables in NU-DATA-UI. The light and dark variants are defined in both CSS variables and Tailwind configuration.

## Implementation Strategy

1. **Theme Context**: Provides theme state and toggle function to all components
2. **Theme Toggle**: Allows users to switch between light and dark modes
3. **Persisted Preference**: User's theme preference is stored in localStorage
4. **OS Preference Detection**: Automatically detects user's OS theme preference

## Component Support

All components use theme-aware color tokens to ensure proper rendering in both light and dark modes. Components are updated to use CSS variables or Tailwind's dark mode classes.
