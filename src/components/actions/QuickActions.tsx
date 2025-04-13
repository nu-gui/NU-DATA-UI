import React from 'react';
import ResponsiveAnimation from '../animations/ResponsiveAnimation';

interface ActionItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: ActionItem[];
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  className = '',
}) => {
  return (
    <div className={`quick-actions ${className}`}>
      {actions.map((action, index) => (
        <ResponsiveAnimation
          key={action.id}
          type="scale"
          delay={index * 0.05} // Staggered animation
          className="inline-block"
        >
          <button
            onClick={action.onClick}
            className="inline-flex items-center justify-center px-4 py-2 mr-2 mb-2 rounded-md bg-primary-50 hover:bg-primary-100 text-primary-700 transition-colors duration-200"
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </button>
        </ResponsiveAnimation>
      ))}
    </div>
  );
};

export default QuickActions;
