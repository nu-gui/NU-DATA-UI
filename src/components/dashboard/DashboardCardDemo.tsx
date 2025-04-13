import React from 'react';
import DashboardCard from './DashboardCard';

const DashboardCardDemo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <DashboardCard 
        title="Total Lists" 
        value={42} 
        trend={{ value: 12, isPositive: true }}
        color="primary"
        onClick={() => console.log('Lists card clicked')}
      />
      
      <DashboardCard 
        title="Active Enrichments" 
        value={8} 
        trend={{ value: 5, isPositive: true }}
        color="success"
        onClick={() => console.log('Enrichments card clicked')}
      />
      
      <DashboardCard 
        title="Pending Exports" 
        value={3} 
        trend={{ value: 2, isPositive: false }}
        color="warning"
        onClick={() => console.log('Exports card clicked')}
      />
      
      <DashboardCard 
        title="Data Groups" 
        value={15} 
        trend={{ value: 8, isPositive: true }}
        color="secondary"
        onClick={() => console.log('Groups card clicked')}
      />
    </div>
  );
};

export default DashboardCardDemo;
