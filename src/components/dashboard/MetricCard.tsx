import React, { useRef, useEffect } from 'react';
import ResponsiveAnimation from '../animations/ResponsiveAnimation';
import { gsap } from 'gsap';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'primary',
  onClick,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const colorClasses = {
    primary: 'bg-primary-50 border-primary-200 text-primary-700 dark:bg-primary-900 dark:border-primary-800 dark:text-primary-300',
    secondary: 'bg-secondary-50 border-secondary-200 text-secondary-700 dark:bg-secondary-900 dark:border-secondary-800 dark:text-secondary-300',
    success: 'bg-success-50 border-success-200 text-success-700 dark:bg-success-900 dark:border-success-800 dark:text-success-300',
    warning: 'bg-warning-50 border-warning-200 text-warning-700 dark:bg-warning-900 dark:border-warning-800 dark:text-warning-300',
    danger: 'bg-error-50 border-error-200 text-error-700 dark:bg-error-900 dark:border-error-800 dark:text-error-300',
  };
  
  useEffect(() => {
    if (cardRef.current && typeof value === 'number') {
      const element = cardRef.current?.querySelector('.card-value'); 
      if (element) {
        gsap.fromTo(
          element,
          { textContent: 0 },
          {
            duration: 1.5,
            textContent: value,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              element.textContent = Math.round(this.targets()[0].textContent).toLocaleString();
            }
          }
        );
      }
    }
  }, [value]);

  return (
    <ResponsiveAnimation
      type="slideUp"
      className={`rounded-lg border p-4 shadow-sm ${colorClasses[color]} transition-colors duration-300 ${className} ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      <div ref={cardRef} onClick={onClick}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">{title}</h3>
          {icon && <div className="text-xl">{icon}</div>}
        </div>
        
        <div className="flex items-baseline">
          <div className="card-value text-2xl font-bold">
            {typeof value === 'number' ? 0 : value}
          </div>
          {trend && (
            <div className={`ml-2 text-sm ${trend.isPositive ? 'text-success-500 dark:text-success-400' : 'text-error-500 dark:text-error-400'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        
        {subtitle && <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>}
      </div>
    </ResponsiveAnimation>
  );
};

export default MetricCard;
