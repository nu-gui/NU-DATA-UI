import React from 'react';
import { StateTransition } from '../animations/StateTransition';
import { MicroInteraction } from '../animations/MicroInteraction';

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const Widget: React.FC<WidgetProps> = ({ 
  title,
  children,
  className = '',
  isLoading = false,
  onRefresh
}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 ${className}`}>
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
      
      <StateTransition state={isLoading ? 'loading' : 'idle'}>
        {children}
      </StateTransition>
    </div>
  );
};

export default Widget;
