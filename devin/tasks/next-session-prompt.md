# Session M4 – Layout & Routing Structure Implementation

**Primary Repo**: `nu-gui/NU-DATA-UI`  
**Secondary Repo**: `nu-gui/nu-data-design`  
**Date**: 2025-04-15  
**Lead**: @wes  
**Participants**: @devin

## Repository Context

NU-DATA-UI is a multi-tenant SaaS platform designed for data enrichment, contact management, campaign analytics, and external system integrations. The platform allows organizations to manage their data, enrich it with additional information, track campaign performance, and connect with external systems through FTP or webhooks.

**Tech Stack**:
- Frontend: React.js with Tailwind CSS
- Backend: Node.js/Express with TypeScript
- Database: PostgreSQL with multi-tenant schema
- Authentication: JWT-based with RBAC
- Design System: Figma with React/Tailwind export pipeline

## Session Objectives

Following the successful completion of Session M3 (Figma Design Verification & Feature Mapping), Session M4 will focus on implementing the core layout structure and routing system for the application based on the verified Figma designs.

### Completed in Session M3:
- ✅ Validated all Figma component exports (100% extraction rate achieved)
- ✅ Created comprehensive component inventory and feature matrix
- ✅ Implemented Card component with Tailwind styling
- ✅ Replaced mockUserService with proper UserService implementation
- ✅ Refactored animations to use Tailwind theme tokens
- ✅ Documented TypeScript dependencies and resolution steps

### Focus for Session M4:
1. Implement main layout components based on Figma designs
2. Set up React Router v6 with route configuration
3. Integrate dark mode support using Figma token exports
4. Continue implementing high-priority components from Feature Matrix

## Execution Instructions

1. **Repository Setup**:
   - Sync with the main branch: `git checkout main && git pull`
   - Create a new branch: `git checkout -b devin/$(date +%s)-session-M4`

2. **Documentation Review**:
   - Review session documentation in `docs/session-series/phase-1/session-M4-layout-routing-structure.md`
   - Check the Feature Matrix in `devin/logs/component-feature-matrix.md`
   - Review implementation gaps in `devin/logs/implementation-gaps-priorities.md`

3. **Implementation Tasks**:

   a. **Layout Structure**:
   - Implement `MainLayout` with header, sidebar, and content area
   - Create `DashboardLayout` with widget grid system
   - Implement `DataViewLayout` with filters and table components
   - Ensure responsive layout with Tailwind breakpoints

   b. **Routing System**:
   - Set up React Router v6 with route configuration
   - Implement route guards for authentication
   - Create route-based code splitting for performance
   - Set up nested routes for dashboard and data views
   - Implement breadcrumb navigation based on route hierarchy

   c. **Dark Mode Integration**:
   - Extract color tokens from Figma design system
   - Create theme context provider for application-wide theme state
   - Implement theme switching using Tailwind and CSS variables
   - Add dark mode toggle component
   - Ensure all components support both light and dark themes

   d. **Component Implementation**:
   - Implement `Sidebar` navigation component with collapsible sections
   - Create `DataTable` component with sorting and pagination
   - Implement `FilterPanel` component for data filtering
   - Ensure all components are responsive and support dark mode

4. **Testing & Validation**:
   - Write unit tests for layout components
   - Create integration tests for routing system
   - Perform visual regression tests for dark mode
   - Test responsive design across breakpoints
   - Verify accessibility for keyboard navigation

5. **Documentation Updates**:
   - Update `devin/logs/component-feature-matrix.md` with newly implemented components
   - Document dark mode implementation in `docs/theme/dark-mode-implementation.md`
   - Update `devin/tasks/task-backlog.md` with remaining tasks

## Session Finalization

1. **Documentation**:
   - Update session documentation in `docs/session-series/phase-1/session-M4-layout-routing-structure.md`
   - Update `devin/logs/AI-Task-History.md` with session summary
   - Create PR for documentation updates

2. **Pull Request**:
   - Create a PR for implementation changes
   - Ensure all CI checks pass
   - Document completed tasks and remaining work in PR description

3. **Next Steps**:
   - Prepare for session M5 focusing on user dashboard implementation
   - Continue implementing remaining high-priority components
   - Plan for data visualization components integration

## Task Backlog

The following tasks remain from previous sessions:

1. **Implement Dark Mode Support**:
   - Context: The current theme implementation needs to be extended to support dark mode.
   - Task: Integrate dark mode tokens from Figma exports and update components to use these tokens.

2. **Implement High-Priority Components**:
   - Context: The Feature Matrix identifies several high-priority components that need implementation.
   - Task: Continue implementing components based on the priority list in the Feature Matrix.

3. **Implement Layout Structure**:
   - Context: The application needs a consistent layout structure for all pages.
   - Task: Implement layout components based on Figma designs and integrate with routing.

## GitHub Issues

The following GitHub issues are related to this session:

- Issue #106: Layout & Routing Structure Implementation

Please update the issue status as tasks are completed.
