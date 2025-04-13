import React from 'react';
import { StateTransition } from '../animations/StateTransition';
import { MicroInteraction } from '../animations/MicroInteraction';
import ResponsiveAnimation from '../animations/ResponsiveAnimation'; // Correct import path

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'combined'; // Allow specifying animation
  animationDuration?: number;
  animationDelay?: number;
  animationEase?: string; // Allow specifying easing key
}

const Widget: React.FC<WidgetProps> = ({ 
  title,
  children,
  className = '',
  isLoading = false,
  onRefresh,
  animationType = 'slideUp', // Default entry animation
  animationDuration,
  animationDelay,
  animationEase,
}) => {
  return (
    <ResponsiveAnimation
      type={animationType}
      duration={animationDuration}
      delay={animationDelay}
      ease={animationEase as any} // Cast ease temporarily
      className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        {onRefresh && (
          <MicroInteraction type="both"> 
            <button 
              onClick={onRefresh}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Refresh widget"
            >
              🔄
            </button>
          </MicroInteraction>
        )}
      </div>
      
      {/* StateTransition will be updated separately to use new animation system */}
      <StateTransition state={isLoading ? 'loading' : 'idle'}>
        {children}
      </StateTransition>
    </ResponsiveAnimation>
  );
};

export default Widget;
