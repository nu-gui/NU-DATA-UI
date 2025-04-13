import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { StateTransition } from '../animations/StateTransition';
import ResponsiveAnimation from '../animations/ResponsiveAnimation';

ChartJS.register(...registerables);

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut';

interface ChartComponentProps {
  type: ChartType;
  data: any;
  options?: any;
  loading?: boolean;
  error?: string;
  title?: string;
  className?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  type,
  data,
  options = {},
  loading = false,
  error = '',
  title,
  className = '',
}) => {
  const [chartState, setChartState] = useState<'idle' | 'loading' | 'error'>('idle');
  
  useEffect(() => {
    if (loading) {
      setChartState('loading');
    } else if (error) {
      setChartState('error');
    } else {
      setChartState('idle');
    }
  }, [loading, error]);
  
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'line':
        return <Line data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} />;
      default:
        return <Bar data={data} options={options} />;
    }
  };
  
  return (
    <ResponsiveAnimation type="slideUp" className={`chart-container ${className}`}>
      {title && <h3 className="text-lg font-medium mb-3">{title}</h3>}
      <div className="rounded-lg border border-gray-200 shadow-sm p-4 bg-white">
        <div style={{ height: '300px' }}>
          <StateTransition 
            state={chartState}
            errorComponent={<div className="text-center text-error-500 h-full flex items-center justify-center">{error}</div>}
            loadingComponent={
              <div className="text-center h-full flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-3 border-primary-500 border-t-transparent rounded-full"></div>
              </div>
            }
          >
            {renderChart()}
          </StateTransition>
        </div>
      </div>
    </ResponsiveAnimation>
  );
};

export default ChartComponent;
