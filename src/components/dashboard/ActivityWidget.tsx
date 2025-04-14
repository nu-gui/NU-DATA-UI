import React from 'react';
import ActivityFeed from '../feed/ActivityFeed';
import Widget from '../elements/Widget';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'export' | 'import';
  user?: string;
}

interface ActivityWidgetProps {
  title?: string;
  activities: ActivityItem[];
  isLoading?: boolean;
  onRefresh?: () => void;
  className?: string;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'combined';
}

const ActivityWidget: React.FC<ActivityWidgetProps> = ({
  title = 'Recent Activity',
  activities,
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
      className={`activity-widget ${className}`}
      animationType={animationType}
    >
      <div className="activity-widget-content">
        <ActivityFeed 
          activities={activities} 
          className="dark:text-gray-300"
        />
      </div>
    </Widget>
  );
};

export default ActivityWidget;
