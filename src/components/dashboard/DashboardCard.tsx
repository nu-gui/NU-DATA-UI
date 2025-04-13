import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      const element = cardRef.current.querySelector('.card-value');
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
    <motion.div
      ref={cardRef}
      className={`rounded-lg border p-4 shadow-sm ${colorClasses[color]} transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        {icon && <div className="text-xl">{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <div className="card-value text-2xl font-bold">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        {trend && (
          <motion.div 
            className={`flex items-center text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="mr-1">
              {trend.isPositive ? '↑' : '↓'}
            </span>
            <span>{trend.value}%</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardCard;
