import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  fullWidth?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  title, 
  fullWidth = false 
}) => {
  return (
    <div className={`page-container ${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'}`}>
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
