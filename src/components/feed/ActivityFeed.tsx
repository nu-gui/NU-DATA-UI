import React from 'react';
import ResponsiveAnimation from '../animations/ResponsiveAnimation';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'export' | 'import';
  user?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  className = '',
}) => {
  const typeIcons = {
    create: '➕',
    update: '✏️',
    delete: '🗑️',
    export: '📤',
    import: '📥',
  };
  
  return (
    <div className={`activity-feed ${className}`}>
      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <ResponsiveAnimation
            key={activity.id}
            type="slideLeft"
            delay={index * 0.07} // Staggered animation
          >
            <li className="border-l-2 border-primary-300 pl-4 py-2">
              <div className="flex items-start">
                <span className="mr-2">{typeIcons[activity.type]}</span>
                <div>
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="mt-1 text-xs text-gray-500">
                    {activity.user && <span className="mr-2">{activity.user}</span>}
                    <time>{activity.timestamp.toLocaleString()}</time>
                  </div>
                </div>
              </div>
            </li>
          </ResponsiveAnimation>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
