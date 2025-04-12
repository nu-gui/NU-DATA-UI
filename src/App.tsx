import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ListManager from './pages/ListManager';

const EnrichmentPlans = () => <div>Enrichment Plans</div>;
const DataGroups = () => <div>Data Groups</div>;
const Connections = () => <div>Connections</div>;
const ExportWizard = () => <div>Export Wizard</div>;
const Search = () => <div>He-Man Search</div>;
const Settings = () => <div>Settings</div>;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="lists" element={<ListManager />} />
          <Route path="enrichment" element={<EnrichmentPlans />} />
          <Route path="groups" element={<DataGroups />} />
          <Route path="connections" element={<Connections />} />
          <Route path="export" element={<ExportWizard />} />
          <Route path="search" element={<Search />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
