import React, { useState } from 'react';
import DashboardLayout from '../components/layout/layouts/DashboardLayout';
import MetricCard from '../components/dashboard/MetricCard';
import ChartWidget from '../components/dashboard/ChartWidget';
import StatusWidget from '../components/dashboard/StatusWidget';
import ActivityWidget from '../components/dashboard/ActivityWidget';

const CampaignDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState({
    metrics: false,
    performance: false,
    engagement: false,
    comparison: false,
  });

  const performanceMetrics = [
    { id: 'total-campaigns', title: 'Total Campaigns Sent', value: 42, trend: { value: 15, isPositive: true } },
    { id: 'total-delivered', title: 'Total Delivered', value: 38500, trend: { value: 12, isPositive: true } },
    { id: 'bounce-rate', title: 'Bounce Rate', value: '2.4%', trend: { value: 0.5, isPositive: false } },
    { id: 'open-rate', title: 'Open Rate', value: '28.7%', trend: { value: 3.2, isPositive: true } },
    { id: 'ctr', title: 'Click-Through Rate', value: '12.3%', trend: { value: 1.8, isPositive: true } },
  ];

  const engagementMetrics = [
    { id: 'avg-engagement', title: 'Avg. Engagement Time', value: '2:45', subtitle: 'minutes:seconds', trend: { value: 12, isPositive: true } },
    { id: 'conversion-rate', title: 'Conversion Rate', value: '5.8%', trend: { value: 0.7, isPositive: true } },
    { id: 'unsubscribe-rate', title: 'Unsubscribe Rate', value: '0.3%', trend: { value: 0.1, isPositive: false } },
    { id: 'geo-reach', title: 'Geo Reach', value: '24', subtitle: 'countries', trend: { value: 4, isPositive: true } },
  ];

  const performanceTimeData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Opens',
        data: [12500, 19000, 13200, 15400, 22000, 27500],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Clicks',
        data: [7200, 11000, 8400, 9300, 16200, 22100],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Conversions',
        data: [3100, 7200, 4300, 5100, 9400, 12200],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      }
    ]
  };

  const activeRecipientsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Active',
        data: [1200, 1900, 2100, 1800, 2400, 1100, 900],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Weekly Average',
        data: [1500, 1500, 1500, 1500, 1500, 1500, 1500],
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderDash: [5, 5],
      }
    ]
  };

  const campaignComparisonData = {
    labels: ['Spring Sale', 'Summer Launch', 'Fall Collection', 'Holiday Special'],
    datasets: [
      {
        label: 'Open Rate',
        data: [28.4, 32.1, 25.7, 35.2],
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Click Rate',
        data: [12.1, 15.3, 10.8, 18.5],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Conversion Rate',
        data: [4.2, 6.7, 3.9, 8.1],
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
      }
    ]
  };

  const recentActivities = [
    {
      id: 'act-1',
      title: 'Holiday Campaign Launched',
      description: 'Campaign sent to 12,500 recipients',
      timestamp: new Date(2025, 3, 12, 9, 30),
      type: 'create' as const,
      user: 'Sarah Johnson'
    },
    {
      id: 'act-2',
      title: 'Spring Sale Campaign Updated',
      description: 'Subject line and preview text modified',
      timestamp: new Date(2025, 3, 11, 14, 15),
      type: 'update' as const,
      user: 'Michael Chen'
    },
    {
      id: 'act-3',
      title: 'Summer Launch Analytics Exported',
      description: 'Full campaign report downloaded',
      timestamp: new Date(2025, 3, 10, 11, 45),
      type: 'export' as const,
      user: 'Alex Rodriguez'
    },
    {
      id: 'act-4',
      title: 'Fall Collection Campaign Archived',
      description: 'Campaign moved to archive',
      timestamp: new Date(2025, 3, 9, 16, 20),
      type: 'delete' as const,
      user: 'Emma Wilson'
    }
  ];

  const systemStatuses = [
    {
      id: 'status-1',
      name: 'Email Delivery Service',
      status: 'success' as const,
      message: 'All systems operational'
    },
    {
      id: 'status-2',
      name: 'Analytics Processing',
      status: 'success' as const,
      message: 'Processing data normally'
    },
    {
      id: 'status-3',
      name: 'API Rate Limits',
      status: 'warning' as const,
      message: '75% of daily quota used'
    }
  ];

  const handleRefresh = (section: keyof typeof isLoading) => {
    setIsLoading(prev => ({ ...prev, [section]: true }));
    
    setTimeout(() => {
      setIsLoading(prev => ({ ...prev, [section]: false }));
    }, 1500);
  };

  return (
    <DashboardLayout title="Campaign Dashboard">
      <div className="p-4 space-y-6">
        {/* Performance Metrics Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {performanceMetrics.map(metric => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                trend={metric.trend}
                color={metric.trend?.isPositive ? 'success' : 'warning'}
              />
            ))}
          </div>
        </section>

        {/* Engagement Metrics Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Engagement Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {engagementMetrics.map(metric => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                trend={metric.trend}
                color={metric.trend?.isPositive ? 'success' : 'warning'}
              />
            ))}
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Over Time Chart */}
          <ChartWidget
            title="Performance Over Time"
            chartType="line"
            data={performanceTimeData}
            isLoading={isLoading.performance}
            onRefresh={() => handleRefresh('performance')}
          />

          {/* Active Recipients Chart */}
          <ChartWidget
            title="Daily/Weekly Active Recipients"
            chartType="line"
            data={activeRecipientsData}
            isLoading={isLoading.performance}
            onRefresh={() => handleRefresh('performance')}
          />
        </section>

        {/* Campaign Comparison Chart */}
        <section>
          <ChartWidget
            title="Campaign Comparison"
            chartType="bar"
            data={campaignComparisonData}
            isLoading={isLoading.comparison}
            onRefresh={() => handleRefresh('comparison')}
            className="w-full"
          />
        </section>

        {/* Activity and Status Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <ActivityWidget
              title="Recent Campaign Activities"
              activities={recentActivities}
              isLoading={isLoading.metrics}
              onRefresh={() => handleRefresh('metrics')}
            />
          </div>

          {/* System Status */}
          <div>
            <StatusWidget
              title="System Status"
              systemStatuses={systemStatuses}
              isLoading={isLoading.metrics}
              onRefresh={() => handleRefresh('metrics')}
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default CampaignDashboard;
