import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MicroInteraction } from '../animations/MicroInteraction';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <MicroInteraction type="hover">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? (
          <span className="text-lg">☀️</span> // Sun icon for light mode
        ) : (
          <span className="text-lg">🌙</span> // Moon icon for dark mode
        )}
      </button>
    </MicroInteraction>
  );
};

export default ThemeToggle;
