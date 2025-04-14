import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/layouts/MainLayout';
import DashboardLayout from '../components/layout/layouts/DashboardLayout';
import DataViewLayout from '../components/layout/layouts/DataViewLayout';
import LoadingSpinner from '../components/feedback/LoadingSpinner';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const ListManagement = lazy(() => import('../pages/ListManagement'));
const EnrichmentPlans = lazy(() => import('../pages/EnrichmentPlans'));
const DataGroups = lazy(() => import('../pages/DataGroups'));
const ExportImport = lazy(() => import('../pages/ExportImport'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true; // Replace with actual auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const RoleGuard = ({ 
  children, 
  requiredRoles = [] 
}: { 
  children: React.ReactNode;
  requiredRoles?: string[];
}) => {
  const userRoles = ['admin']; // Replace with actual user roles
  
  const hasRequiredRole = requiredRoles.length === 0 || 
    requiredRoles.some(role => userRoles.includes(role));
  
  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

const PageLoading = () => (
  <div className="flex items-center justify-center h-full">
    <LoadingSpinner size="large" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Main layout with nested routes */}
        <Route 
          path="/" 
          element={
            <AuthGuard>
              <MainLayout />
            </AuthGuard>
          }
        >
          {/* Dashboard */}
          <Route 
            index 
            element={
              <RoleGuard>
                <Dashboard />
              </RoleGuard>
            } 
          />
          
          {/* List Management */}
          <Route 
            path="lists/*" 
            element={
              <RoleGuard requiredRoles={['admin', 'editor']}>
                <ListManagement />
              </RoleGuard>
            } 
          />
          
          {/* Enrichment Plans */}
          <Route 
            path="enrichment/*" 
            element={
              <RoleGuard requiredRoles={['admin', 'editor']}>
                <EnrichmentPlans />
              </RoleGuard>
            } 
          />
          
          {/* Data Groups */}
          <Route 
            path="data-groups/*" 
            element={
              <RoleGuard requiredRoles={['admin', 'editor', 'viewer']}>
                <DataGroups />
              </RoleGuard>
            } 
          />
          
          {/* Export/Import */}
          <Route 
            path="export-import/*" 
            element={
              <RoleGuard requiredRoles={['admin', 'editor']}>
                <ExportImport />
              </RoleGuard>
            } 
          />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
