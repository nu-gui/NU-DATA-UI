import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarMenu from '../SidebarMenu';
import TopHeader from '../TopHeader';
import { PageTransition } from '../../animations/PageTransition';
import { useTheme } from '../../../context/ThemeContext';
import ThemeToggle from '../../theme/ThemeToggle';

interface MainLayoutProps {
  title?: string;
  breadcrumbs?: { name: string; path: string }[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  title = 'Dashboard', 
  breadcrumbs = [{ name: 'Home', path: '/' }] 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { darkMode } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <SidebarMenu isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader 
          title={title} 
          breadcrumbs={breadcrumbs}
          rightContent={<ThemeToggle />}
        />
        
        <main className="flex-1 overflow-y-auto p-4">
          <PageTransition transitionKey={location.pathname} animation="fadeIn">
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
