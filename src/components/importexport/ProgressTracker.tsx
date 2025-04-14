import React from 'react';
import { MicroInteraction } from '../animations/MicroInteraction';

interface ProgressTrackerProps {
  progress: number; // 0-100
  status: 'idle' | 'processing' | 'success' | 'error';
  message?: string;
  className?: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  status,
  message,
  className = '',
}) => {
  const statusColors = {
    idle: 'bg-gray-200 dark:bg-gray-700',
    processing: 'bg-primary-500 dark:bg-primary-600',
    success: 'bg-success-500 dark:bg-success-600',
    error: 'bg-error-500 dark:bg-error-600',
  };

  const statusMessages = {
    idle: 'Ready to start',
    processing: `Processing (${progress}%)`,
    success: 'Completed successfully',
    error: 'Error occurred',
  };

  return (
    <div className={className}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {statusMessages[status]}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <MicroInteraction type="both">
          <div
            className={`h-2.5 rounded-full ${statusColors[status]} transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        </MicroInteraction>
      </div>
      {message && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
      )}
    </div>
  );
};

export default ProgressTracker;
