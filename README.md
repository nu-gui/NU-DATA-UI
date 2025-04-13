# NU-DATA-UI

## Overview
The NU DATA UI system is a multi-tenant SaaS platform designed to centralize and streamline data enrichment, contact management, campaign analytics, and external system integrations (via FTP/Webhooks).

## Purpose
- Enable organizations to manage and enrich contact data
- Provide RPC/WPC enrichment scoring via Python backend
- Support FTP/webhook automation and integrations
- Offer federated search and data grouping capabilities
- Facilitate export pipelines and metrics
- Deliver real-time and scheduled backend batch processing
- Present dashboard analytics with role-based access control

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js / Python
- **Database**: PostgreSQL
- **API Documentation**: OpenAPI 3.1
- **Integration Layer**: FTP / Webhooks
- **CI/CD**: GitHub Actions

## Repository Structure
```
NU-DATA-UI/
├── docs/                     # Project documentation
│   ├── api/                  # API documentation (OpenAPI schema)
│   ├── figma/                # Figma export guides
│   ├── issues/               # Project issues and tasks
│   ├── project-overview/     # High-level project descriptions
│   └── session-series/       # Development session documentation
├── src/                      # Source code (to be implemented)
│   ├── components/           # UI components
│   ├── pages/                # Application pages
│   ├── api/                  # Backend API routes
│   └── services/             # Business logic services
├── scripts/                  # Build and deployment scripts
├── devin/                    # Devin AI working directory
│   ├── logs/                 # Session logs and tracking
│   └── tasks/                # Task definitions and status
├── .github/                  # GitHub configuration (to be implemented)
│   └── workflows/            # CI/CD workflows
└── README.md                 # This file
```


## Animation System
The NU-DATA-UI application utilizes a responsive and accessible animation system built primarily with Framer Motion. Key aspects include:

- **`ResponsiveAnimation.tsx`**: A wrapper component (<ref_file file="/home/ubuntu/repos/NU-DATA-UI/src/components/animations/ResponsiveAnimation.tsx" />) used to apply consistent entry animations to UI elements like Cards, Widgets, and Page Containers.
- **Centralized Definitions**: Core animation variants (fade, slide, scale) are defined in <ref_file file="/home/ubuntu/repos/NU-DATA-UI/src/animations/animations.ts" /> and easing curves are managed in <ref_file file="/home/ubuntu/repos/NU-DATA-UI/src/animations/easings.ts" />. These definitions leverage functions like `getAnimations` to provide motion-aware variants.
- **Responsiveness**: Animations adapt to different screen sizes using the <ref_file file="/home/ubuntu/repos/NU-DATA-UI/src/hooks/useMediaQuery.ts" /> hook. Durations and delays may be adjusted for mobile and tablet views.
- **Accessibility**: The system respects user preferences for reduced motion via the <ref_file file="/home/ubuntu/repos/NU-DATA-UI/src/hooks/useReducedMotion.ts" /> hook, which disables or minimizes animations when requested.
- **State Transitions**: The <ref_file file="/home/ubuntu/repos/NU-DATA-UI/src/components/animations/StateTransition.tsx" /> component handles animated transitions between different component states (e.g., loading, idle, error).
- **GSAP**: While Framer Motion is the primary tool, GSAP may be used for more complex timeline-based animations if required in specific components.
- **Tailwind Integration**: Animation properties aim to align with design tokens defined in the `nu-data-design` repository, although direct Tailwind CSS keyframe animations have been removed in favor of JavaScript-based animations for better control and accessibility integration.
- **Theme Integration**: Animation states (success/error) use CSS variables that connect to the application's theme system, ensuring consistent styling across components.

### Animation Components

The animation system includes the following animated components:

- **StatusCard**: Animated status notifications that support success, error, warning, info, and loading states with appropriate color coding and transitions.
- **QuickActions**: Action buttons with staggered reveal animations for improved user experience when displaying multiple actions.
- **ActivityFeed**: Dynamic activity feed with staggered animations for each entry, supporting various activity types with appropriate icons.
- **SearchResults**: Search result listings with staggered fade-in animations and loading/empty states for a smooth search experience.
- **Chart**: Data visualization component with state transitions for loading, error, and data states, supporting bar, line, pie, and doughnut chart types.

All animation components respect user preferences for reduced motion and adjust timing based on device capabilities, ensuring a consistent and accessible experience across different environments.

## Getting Started
*Development setup instructions will be added in future sessions*

## License
See the [LICENSE](LICENSE) file for details.
