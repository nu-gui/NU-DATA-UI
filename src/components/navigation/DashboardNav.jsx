import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const DashboardNav = () => {
  const location = useLocation();
  
  return (
    <Nav variant="pills" className="flex-column mb-4">
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/dashboard"
          active={location.pathname === '/dashboard'}
        >
          Overview
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/dashboard/export-insights"
          active={location.pathname === '/dashboard/export-insights'}
        >
          Export Insights
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/dashboard/enrichment-plans"
          active={location.pathname === '/dashboard/enrichment-plans'}
        >
          Enrichment Plans
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/dashboard/lists"
          active={location.pathname === '/dashboard/lists'}
        >
          Lists
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default DashboardNav;
