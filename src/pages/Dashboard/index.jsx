import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import DashboardNav from '../../components/navigation/DashboardNav';
import ExportInsightsPage from './ExportInsightsPage';

const DashboardOverview = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1>Dashboard</h1>
          <p className="text-muted">Welcome to your NU-DATA dashboard</p>
        </Col>
      </Row>
      
      <Row>
        <Col md={4} lg={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Export Activity</Card.Title>
              <Card.Text>
                <span className="h3">24</span> exports this week
              </Card.Text>
              <a href="/dashboard/export-insights" className="btn btn-sm btn-outline-primary">
                View Details
              </a>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} lg={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Enrichment Plans</Card.Title>
              <Card.Text>
                <span className="h3">5</span> active plans
              </Card.Text>
              <a href="/dashboard/enrichment-plans" className="btn btn-sm btn-outline-primary">
                View Details
              </a>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} lg={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Lists</Card.Title>
              <Card.Text>
                <span className="h3">12</span> lists
              </Card.Text>
              <a href="/dashboard/lists" className="btn btn-sm btn-outline-primary">
                View Details
              </a>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} lg={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Connections</Card.Title>
              <Card.Text>
                <span className="h3">3</span> active connections
              </Card.Text>
              <a href="/dashboard/connections" className="btn btn-sm btn-outline-primary">
                View Details
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const Dashboard = () => {
  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={3} lg={2}>
          <DashboardNav />
        </Col>
        <Col md={9} lg={10}>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/export-insights" element={<ExportInsightsPage />} />
            {/* Add other dashboard routes here */}
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
