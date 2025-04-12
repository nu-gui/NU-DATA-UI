import React from 'react';

interface TopHeaderProps {
  title: string;
  breadcrumbs: { name: string; path: string }[];
}

const TopHeader: React.FC<TopHeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="top-header">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex items-center text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && <span className="mx-2">/</span>}
              <a href={crumb.path} className="hover:text-primary-600">
                {crumb.name}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          🔔
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          ❓
        </button>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            👤
          </div>
          <div className="ml-2 hidden md:block">
            <div className="text-sm font-medium">User Name</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
