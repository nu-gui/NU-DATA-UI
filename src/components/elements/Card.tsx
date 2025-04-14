import React from 'react';
import ResponsiveAnimation from '../animations/ResponsiveAnimation';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  onClick?: () => void;
}

/**
 * Card component with Tailwind CSS styling
 * 
 * Based on Figma design from nu-data-design repository
 * Implementation date: 2025-04-14
 */
const Card: React.FC<CardProps> = ({ 
  children, 
  title,
  className = '',
  variant = 'default',
  elevation = 'md',
  rounded = 'md',
  padding = 'md',
  animate = true,
  animationType = 'slideUp',
  onClick,
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    primary: 'bg-primary-50 dark:bg-primary-900 border border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-100',
    secondary: 'bg-secondary-50 dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 text-secondary-700 dark:text-secondary-100',
    success: 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-100',
    warning: 'bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-100',
    error: 'bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-100',
    info: 'bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-100',
  };

  const elevationClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const cardContent = (
    <div
      className={`
        ${variantClasses[variant]}
        ${elevationClasses[elevation]}
        ${roundedClasses[rounded]}
        ${paddingClasses[padding]}
        transition-all duration-200 ease-in-out
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {title && (
        <div className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
          {title}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );

  if (animate) {
    return (
      <ResponsiveAnimation type={animationType}>
        {cardContent}
      </ResponsiveAnimation>
    );
  }

  return cardContent;
};

export default Card;
