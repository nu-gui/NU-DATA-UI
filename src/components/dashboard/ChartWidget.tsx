import React from 'react';
import ChartComponent from '../data/Chart';
import Widget from '../elements/Widget';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut';

interface ChartWidgetProps {
  title: string;
  chartType: ChartType;
  data: any;
  options?: any;
  isLoading?: boolean;
  error?: string;
  onRefresh?: () => void;
  className?: string;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'combined';
}

const ChartWidget: React.FC<ChartWidgetProps> = ({
  title,
  chartType,
  data,
  options = {},
  isLoading = false,
  error = '',
  onRefresh,
  className = '',
  animationType = 'slideUp',
}) => {
  return (
    <Widget
      title={title}
      className={`chart-widget ${className}`}
      isLoading={isLoading}
      onRefresh={onRefresh}
      animationType={animationType}
    >
      <div className="chart-container h-64">
        <ChartComponent
          type={chartType}
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            ...options
          }}
          loading={isLoading}
          error={error}
        />
      </div>
    </Widget>
  );
};

export default ChartWidget;
