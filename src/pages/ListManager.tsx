import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';

type ListType = 'controlled' | 'enriched' | 'outcomes';

interface ListItem {
  id: string;
  name: string;
  records: number;
  created: string;
  status: string;
}

const mockLists: Record<ListType, ListItem[]> = {
  controlled: [
    { id: '1', name: 'Customer Database Q1', records: 5432, created: '2025-01-15', status: 'Active' },
    { id: '2', name: 'Marketing Contacts', records: 2145, created: '2025-02-20', status: 'Active' },
    { id: '3', name: 'Sales Prospects', records: 876, created: '2025-03-05', status: 'Inactive' },
  ],
  enriched: [
    { id: '4', name: 'Customer Database Q1 (Enriched)', records: 5432, created: '2025-01-16', status: 'Completed' },
    { id: '5', name: 'Marketing Contacts (Enriched)', records: 2145, created: '2025-02-21', status: 'Processing' },
  ],
  outcomes: [
    { id: '6', name: 'Q1 Campaign Results', records: 4321, created: '2025-01-30', status: 'Analyzed' },
    { id: '7', name: 'Marketing Outreach Outcomes', records: 1987, created: '2025-03-10', status: 'Pending' },
  ],
};

const ListManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ListType>('controlled');

  return (
    <PageContainer title="List Manager">
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('controlled')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'controlled'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Controlled Lists
            </button>
            <button
              onClick={() => setActiveTab('enriched')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'enriched'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Enriched Lists
            </button>
            <button
              onClick={() => setActiveTab('outcomes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'outcomes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Outcomes
            </button>
          </nav>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            + New List
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search lists..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg">
            🔍
          </button>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow-sm rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Records
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockLists[activeTab].map((list) => (
              <tr key={list.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{list.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{list.records.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{list.created}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    list.status === 'Active' || list.status === 'Completed' || list.status === 'Analyzed'
                      ? 'bg-green-100 text-green-800'
                      : list.status === 'Processing' || list.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {list.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-gray-600 hover:text-gray-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
};

export default ListManager;
