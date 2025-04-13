import React, { useRef, useEffect } from 'react';
import ResponsiveAnimation from '../animations/ResponsiveAnimation';
import { gsap } from 'gsap';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'primary',
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const colorClasses = {
    primary: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    secondary: 'bg-gray-50 border-gray-200 text-gray-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    danger: 'bg-red-50 border-red-200 text-red-700'
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
      type="slideUp" // Default animation, can be customized via props if needed
      className={`rounded-lg border p-4 shadow-sm ${colorClasses[color]} transition-colors duration-300`} // Keep color transition, remove motion transition
      onClick={onClick}
    >
      <div ref={cardRef}> {/* Add a wrapper div for GSAP to target if needed, or adjust selector */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">{title}</h3>
          {icon && <div className="text-xl">{icon}</div>}
        </div>
        
        <div className="flex items-end justify-between">
          <div className="card-value text-2xl font-bold">
            {/* GSAP targets this element */}
            {typeof value === 'number' ? 0 : value} {/* Start at 0 for GSAP animation */}
          </div>
          
          {trend && (
            <ResponsiveAnimation 
              type="fade" 
              delay={0.3} // Keep original delay
              className={`flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
            >
              <span className="mr-1">
                {trend.isPositive ? '↑' : '↓'}
              </span>
              <span>{trend.value}%</span>
            </ResponsiveAnimation>
          )}
        </div>
      </div>
    </ResponsiveAnimation>
  );
};

export default DashboardCard;
