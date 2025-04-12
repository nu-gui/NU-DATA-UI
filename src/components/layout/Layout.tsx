import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import TopHeader from './TopHeader';

interface LayoutProps {
  title?: string;
  breadcrumbs?: { name: string; path: string }[];
}

const Layout: React.FC<LayoutProps> = ({ 
  title = 'Dashboard', 
  breadcrumbs = [{ name: 'Home', path: '/' }] 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarMenu isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader title={title} breadcrumbs={breadcrumbs} />
        
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
