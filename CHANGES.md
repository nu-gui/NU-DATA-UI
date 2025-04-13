# Change Log

## [Unreleased] - 2025-04-13

### Added
- New animated components: `StatusCard`, `QuickActions`, `ActivityFeed`, `SearchResults`, and `Chart`.
- CSS variables for theme colors in `theme-variables.css` to ensure consistent styling.
- Theme integration for animation states.

### Changed
- Updated `animations.ts` to use theme tokens instead of hardcoded colors for state animations.
- Enhanced animation system documentation in README.md with component descriptions.

## [Released] - 2025-04-13

### Added
- Centralized animation system using Framer Motion (`ResponsiveAnimation.tsx`, `animations.ts`, `easings.ts`).
- `useReducedMotion` hook for accessibility compliance.
- Animation system documentation to `README.md`.

### Changed
- Refactored `Card`, `ExportAnalyticsDashboard`, `PageContainer`, `Widget`, `DashboardCard`, `StateTransition`, and `PageTransition` components to use the new animation system.
- Updated `useMediaQuery` hook.
- Removed unused Tailwind CSS keyframe animations from `tailwind.config.js`.

### Fixed
- Corrected animation import paths.

### Removed
- Hardcoded `motion.div` and animation properties from various components.
- Legacy `src/styles/animations/easings.js`.

*Changes related to PR #82 (feat/anim1-responsive-animation)*
