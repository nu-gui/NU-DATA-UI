import React from 'react';
import ResponsiveAnimation from '../animations/ResponsiveAnimation';
import { StateTransition } from '../animations/StateTransition';

interface StatusCardProps {
  status: 'success' | 'error' | 'warning' | 'info' | 'loading';
  title: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  status,
  title,
  message,
  onClose,
  className = '',
}) => {
  const statusClasses = {
    success: 'bg-success-50 border-success-200 text-success-700',
    error: 'bg-error-50 border-error-200 text-error-700',
    warning: 'bg-warning-50 border-warning-200 text-warning-700',
    info: 'bg-info-50 border-info-200 text-info-700',
    loading: 'bg-gray-50 border-gray-200 text-gray-700',
  };
  
  return (
    <ResponsiveAnimation
      type="combined"
      className={`rounded-lg border p-4 shadow-sm ${statusClasses[status]} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-lg font-medium mb-1">{title}</h4>
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>
    </ResponsiveAnimation>
  );
};

export default StatusCard;
