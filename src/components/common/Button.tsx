import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', disabled = false }) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
