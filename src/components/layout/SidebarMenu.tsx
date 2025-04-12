import React from 'react';
import { NavLink } from 'react-router-dom';
import { MicroInteraction } from '../animations/MicroInteraction';

interface SidebarMenuProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  path: string;
  name: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { path: '/dashboard', name: 'Dashboard', icon: '📊' },
  { path: '/lists', name: 'List Manager', icon: '📋' },
  { path: '/enrichment', name: 'Enrichment Plans', icon: '🔄' },
  { path: '/groups', name: 'Data Groups', icon: '📁' },
  { path: '/connections', name: 'Connections', icon: '🔌' },
  { path: '/export', name: 'Export Wizard', icon: '📤' },
  { path: '/search', name: 'He-Man Search', icon: '🔍' },
  { path: '/settings', name: 'Settings', icon: '⚙️' },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`h-screen bg-white border-r transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center w-full'}`}>
          <span className="text-xl font-bold text-primary-600">NU DATA</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className={`text-gray-500 hover:text-gray-700 ${!isOpen && 'hidden'}`}
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2 px-4">
              <MicroInteraction type="hover">
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''} ${!isOpen ? 'justify-center' : ''}`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {isOpen && <span>{item.name}</span>}
                </NavLink>
              </MicroInteraction>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMenu;
