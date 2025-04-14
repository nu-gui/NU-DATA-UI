import React from 'react';
import Card from './Card';

/**
 * CardDemo component to showcase the Card component with different variants
 * 
 * Implementation date: 2025-04-14
 */
const CardDemo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Default Card */}
      <Card title="Default Card">
        <p className="text-gray-600 dark:text-gray-300">
          This is a default card with medium elevation and rounded corners.
        </p>
      </Card>

      {/* Primary Card */}
      <Card 
        title="Primary Card" 
        variant="primary"
        elevation="lg"
      >
        <p className="text-primary-600 dark:text-primary-300">
          This is a primary card with large elevation.
        </p>
      </Card>

      {/* Secondary Card */}
      <Card 
        title="Secondary Card" 
        variant="secondary"
        rounded="lg"
      >
        <p className="text-secondary-600 dark:text-secondary-300">
          This is a secondary card with large rounded corners.
        </p>
      </Card>

      {/* Success Card */}
      <Card 
        title="Success Card" 
        variant="success"
        padding="lg"
      >
        <p className="text-green-600 dark:text-green-300">
          This is a success card with large padding.
        </p>
      </Card>

      {/* Warning Card */}
      <Card 
        title="Warning Card" 
        variant="warning"
        animationType="fade"
      >
        <p className="text-yellow-600 dark:text-yellow-300">
          This is a warning card with fade animation.
        </p>
      </Card>

      {/* Error Card */}
      <Card 
        title="Error Card" 
        variant="error"
        animationType="scale"
      >
        <p className="text-red-600 dark:text-red-300">
          This is an error card with scale animation.
        </p>
      </Card>

      {/* Info Card */}
      <Card 
        title="Info Card" 
        variant="info"
        animate={false}
      >
        <p className="text-blue-600 dark:text-blue-300">
          This is an info card with no animation.
        </p>
      </Card>

      {/* Custom Card */}
      <Card 
        title="Custom Card" 
        className="bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-900 dark:border-purple-700 dark:text-purple-100"
        elevation="xl"
        rounded="xl"
        padding="xl"
        animationType="slideRight"
      >
        <p className="text-purple-600 dark:text-purple-300">
          This is a custom card with extra large elevation, rounded corners, and padding.
        </p>
      </Card>

      {/* Interactive Card */}
      <Card 
        title="Interactive Card" 
        variant="primary"
        onClick={() => alert('Card clicked!')}
        className="cursor-pointer hover:shadow-xl transition-shadow duration-300"
      >
        <p className="text-primary-600 dark:text-primary-300">
          This is an interactive card. Click me!
        </p>
      </Card>
    </div>
  );
};

export default CardDemo;
