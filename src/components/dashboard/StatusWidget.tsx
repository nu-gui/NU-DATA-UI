import React from 'react';
import Widget from '../elements/Widget';
import StatusCard from '../status/StatusCard';

interface SystemStatus {
  id: string;
  name: string;
  status: 'success' | 'error' | 'warning' | 'info' | 'loading';
  message: string;
}

interface StatusWidgetProps {
  title?: string;
  systemStatuses: SystemStatus[];
  isLoading?: boolean;
  onRefresh?: () => void;
  className?: string;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'combined';
}

const StatusWidget: React.FC<StatusWidgetProps> = ({
  title = 'System Status',
  systemStatuses,
  isLoading = false,
  onRefresh,
  className = '',
  animationType = 'slideUp',
}) => {
  return (
    <Widget
      title={title}
      isLoading={isLoading}
      onRefresh={onRefresh}
      className={`status-widget ${className}`}
      animationType={animationType}
    >
      <div className="space-y-3">
        {systemStatuses.map((status) => (
          <StatusCard
            key={status.id}
            status={status.status}
            title={status.name}
            message={status.message}
            className="dark:bg-gray-800 dark:border-gray-700"
          />
        ))}
        {systemStatuses.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            All systems operational
          </div>
        )}
      </div>
    </Widget>
  );
};

export default StatusWidget;
