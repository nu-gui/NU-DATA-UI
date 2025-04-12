# NU-DATA-UI Frontend Structure

This document outlines the organization and structure of the NU-DATA-UI frontend code.

## Folder Structure

```
src/
├── animations/          # Animation utilities and configurations
│   ├── animations.ts    # Predefined animation patterns
│   ├── easings.ts       # Easing functions
│   └── transitions.ts   # Transition configurations
│
├── components/          # Reusable UI components
│   ├── animations/      # Animation components
│   │   ├── MicroInteraction.tsx
│   │   ├── PageTransition.tsx
│   │   └── StateTransition.tsx
│   │
│   ├── elements/        # Basic UI elements
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   │
│   └── layout/          # Layout components
│       ├── Layout.tsx   # Main application layout
│       ├── SidebarMenu.tsx
│       ├── TopHeader.tsx
│       └── PageContainer.tsx
│
├── pages/               # Application pages
│   ├── Dashboard.tsx
│   ├── ListManager.tsx
│   └── ...
│
├── styles/              # Global styles
│   └── tailwind.css     # Tailwind imports and custom styles
│
└── App.tsx              # Main app component with routing
```

## Navigation Structure

The application uses React Router v6 for navigation. The main navigation structure is:

- `/` - Redirects to dashboard
- `/dashboard` - Main dashboard
- `/lists` - List Manager
- `/enrichment` - Enrichment Plans
- `/groups` - Data Groups
- `/connections` - Connections
- `/export` - Export Wizard
- `/search` - He-Man Search
- `/settings` - Settings

The sidebar menu in `SidebarMenu.tsx` provides navigation links to these routes.

## Component Design Principles

1. **Separation of Concerns**: Components are organized by their function (layout, elements, animations)
2. **Reusability**: Components are designed to be reusable across the application
3. **Consistency**: Components follow consistent naming and styling conventions
4. **Responsiveness**: All components are designed to work on various screen sizes
5. **Animation**: Animations are used to enhance the user experience

## Animation System

The animation system consists of:

1. **PageTransition**: For smooth transitions between pages
2. **MicroInteraction**: For interactive elements (buttons, links)
3. **StateTransition**: For handling different states (loading, success, error)

The animation system is built on Framer Motion and provides:
- Consistent motion patterns across the application
- Configurable animation parameters
- Reusable animation components
- Predefined animation variants for common use cases

## Styling Approach

The application uses Tailwind CSS for styling with:

1. Custom color palette defined in tailwind.config.js
2. Custom animations and transitions
3. Responsive design utilities
4. Component-specific styles using utility classes

### Color System

The color system is based on the following palette:
- Primary: Blue-based colors for primary actions and branding
- Secondary: Purple-based colors for secondary actions
- Gray: Neutral colors for text, backgrounds, and borders
- Success/Error/Warning/Info: Semantic colors for feedback

### Typography

The application uses two main font families:
- Inter: Primary sans-serif font for body text and UI elements
- Poppins: Display font for headings and emphasis

## State Management

The application uses React's built-in state management with:
1. Local component state for UI-specific state
2. Context API for shared state across components
3. Redux for global application state (when needed)

## Responsive Design

The UI is designed to be responsive across different screen sizes:
- Mobile-first approach with progressive enhancement
- Breakpoints defined in Tailwind configuration
- Responsive layout components that adapt to screen size
- Collapsible sidebar for mobile views
