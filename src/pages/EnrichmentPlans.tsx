import React from 'react';
import DataViewLayout from '../components/layout/layouts/DataViewLayout';

const FilterPanel = () => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
    <h3 className="text-lg font-medium mb-4">Filters</h3>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          <option>All</option>
          <option>Active</option>
          <option>Paused</option>
          <option>Completed</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
          <option>All</option>
          <option>Basic</option>
          <option>Advanced</option>
          <option>Custom</option>
        </select>
      </div>
      <button className="w-full bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600">
        Apply Filters
      </button>
    </div>
  </div>
);

const EnrichmentPlans: React.FC = () => {
  return (
    <DataViewLayout 
      title="Enrichment Plans" 
      filterPanel={<FilterPanel />}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Enrichment Plans</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Run</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Standard Contact Enrichment</td>
                <td className="px-6 py-4 whitespace-nowrap">Basic</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-04-10</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Advanced Company Data</td>
                <td className="px-6 py-4 whitespace-nowrap">Advanced</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Paused
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-03-25</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Custom Integration Plan</td>
                <td className="px-6 py-4 whitespace-nowrap">Custom</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2025-02-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing 1-3 of 12 plans
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded dark:border-gray-600">Previous</button>
            <button className="px-3 py-1 bg-primary-500 text-white rounded">1</button>
            <button className="px-3 py-1 border rounded dark:border-gray-600">2</button>
            <button className="px-3 py-1 border rounded dark:border-gray-600">3</button>
            <button className="px-3 py-1 border rounded dark:border-gray-600">Next</button>
          </div>
        </div>
      </div>
    </DataViewLayout>
  );
};

export default EnrichmentPlans;
