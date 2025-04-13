import React, { ReactNode } from 'react';
import ResponsiveAnimation from '../animations/ResponsiveAnimation'; // Import the wrapper

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  fullWidth?: boolean;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'combined'; // Allow specifying animation
  animationDuration?: number;
  animationDelay?: number;
  animationEase?: string; // Allow specifying easing key
}

const PageContainer: React.FC<PageContainerProps> = ({ 
  children, 
  title, 
  fullWidth = false,
  animationType = 'fade', // Default to fade animation
  animationDuration,
  animationDelay,
  animationEase,
}) => {
  return (
    <div className={`page-container ${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'}`}>
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      {/* Wrap the main content area with animation */}
      <ResponsiveAnimation
        type={animationType}
        duration={animationDuration}
        delay={animationDelay}
        ease={animationEase as any} // Cast ease to any to satisfy type temporarily due to unresolved TS issues
        className="bg-white rounded-lg shadow-sm p-4 md:p-6" // Apply original classes here
      >
        {children}
      </ResponsiveAnimation>
    </div>
  );
};

export default PageContainer;
