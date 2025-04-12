import React from 'react';
import { Container, Breadcrumb } from 'react-bootstrap';
import ExportAnalyticsDashboard from '../../components/dashboard/ExportAnalyticsDashboard';

const ExportInsightsPage = () => {
  return (
    <Container fluid className="p-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item active>Export Insights</Breadcrumb.Item>
      </Breadcrumb>
      
      <h1 className="mb-4">Export Insights</h1>
      
      <ExportAnalyticsDashboard />
    </Container>
  );
};

export default ExportInsightsPage;
