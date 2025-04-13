import React from 'react';
import ResponsiveAnimation from '../animations/ResponsiveAnimation'; // Import the wrapper

const Card = ({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  animationType = 'slideUp', // Default animation type
  animationDuration, // Allow overriding duration
  animationDelay, // Allow overriding delay
  animationEase, // Allow overriding ease
  ...props // Pass remaining props to the underlying div
}) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variantClasses = {
    default: 'bg-white',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border border-gray-200',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };
  
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;
  
  
  return (
    <ResponsiveAnimation
      type={animationType}
      duration={animationDuration}
      delay={animationDelay}
      ease={animationEase}
      className={cardClasses}
      {...props} // Pass props like onClick, etc., to the div rendered by ResponsiveAnimation
    >
      {children}
    </ResponsiveAnimation>
  );
};

export default Card;
