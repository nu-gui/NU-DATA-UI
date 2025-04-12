import React from 'react';
import PageContainer from '../components/layout/PageContainer';

const Dashboard: React.FC = () => {
  return (
    <PageContainer title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Metrics Widget */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Enriched Records</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Export Queue</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Processing Jobs</span>
                <span className="text-sm font-medium">12%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Widget */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                📋
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">New list created</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                🔄
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Enrichment completed</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                📤
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Data exported</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Widget */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg">
              <span className="flex items-center">
                <span className="text-blue-500 mr-3">📋</span>
                <span className="text-sm font-medium">Create New List</span>
              </span>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg">
              <span className="flex items-center">
                <span className="text-green-500 mr-3">🔄</span>
                <span className="text-sm font-medium">Start Enrichment</span>
              </span>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg">
              <span className="flex items-center">
                <span className="text-purple-500 mr-3">📤</span>
                <span className="text-sm font-medium">Export Data</span>
              </span>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
