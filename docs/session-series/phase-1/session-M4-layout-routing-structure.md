# Session M4 – Layout & Routing Structure Implementation

**Primary Repo**: `nu-gui/NU-DATA-UI`  
**Secondary Repo**: `nu-gui/nu-data-design`  
**Date**: 2025-04-15  
**Lead**: @wes  
**Participants**: @devin

---

## 🎯 Objective

Implement the core layout structure and routing system for the NU-DATA-UI application based on Figma designs. Integrate dark mode support using Figma token exports and continue implementing high-priority components identified in the Feature Matrix.

---

## 📦 Scope

### 🏗️ Layout Structure
- Implement main layout components based on Figma designs:
  - `MainLayout` with header, sidebar, and content area
  - `DashboardLayout` with widget grid system
  - `DataViewLayout` with filters and table components
- Create responsive layout system with Tailwind breakpoints
- Implement layout switching based on route configuration

### 🧭 Routing System
- Set up React Router v6 with route configuration
- Implement route guards for authentication
- Create route-based code splitting for performance
- Set up nested routes for dashboard and data views
- Implement breadcrumb navigation based on route hierarchy

### 🌓 Dark Mode Integration
- Integrate dark mode toggle component
- Implement theme switching using Tailwind and CSS variables
- Extract color tokens from Figma design system
- Create theme context provider for application-wide theme state
- Ensure all components support both light and dark themes

### 🧩 Component Implementation
- Continue implementing high-priority components from Feature Matrix:
  - `Sidebar` navigation component with collapsible sections
  - `DataTable` component with sorting and pagination
  - `FilterPanel` component for data filtering
- Ensure all components are responsive and support dark mode

---

## 🔗 Dependencies
- ✅ PR #98 (Figma design verification & feature mapping)
- ✅ PR #14 (Card component implementation)
- ⚠️ Builds on: `session-M3`
- ⚡ Blocks: User dashboard implementation

---

## 💡 Implementation Notes

**Layout Structure:**
```jsx
// Example MainLayout component structure
const MainLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
    <Sidebar />
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  </div>
);
```

**Routing Configuration:**
```jsx
// Example route configuration
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'data', element: <DataView /> },
      { path: 'settings', element: <Settings /> }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> }
    ]
  }
];
```

**Dark Mode Implementation:**
```jsx
// Example theme context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

## 📊 Testing & Validation
- [ ] Unit tests for layout components
- [ ] Integration tests for routing system
- [ ] Visual regression tests for dark mode
- [ ] Responsive design testing across breakpoints
- [ ] Accessibility testing for keyboard navigation

---

## 🚧 Next Steps
- Implement user dashboard with widgets
- Integrate data visualization components
- Connect API endpoints to data views
- Implement user settings and preferences
- Complete remaining high-priority components from Feature Matrix

---
