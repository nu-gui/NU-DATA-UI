import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Card from '../../components/design/Card';
import { animations } from '../../styles/animations';
import { motion } from 'framer-motion';

Chart.register(...registerables);

const ExportAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [exportsByType, setExportsByType] = useState([]);
  const [exportsByDate, setExportsByDate] = useState([]);
  const [exportsByTag, setExportsByTag] = useState([]);
  const [recentExports, setRecentExports] = useState([]);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fetchAnalyticsData();
  }, [startDate, endDate]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);

    try {
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];

      const summaryResponse = await axios.get(`/api/v1/analytics/exports/summary?start_date=${start}&end_date=${end}`);
      setSummary(summaryResponse.data);

      const typeResponse = await axios.get(`/api/v1/analytics/exports/by-type?start_date=${start}&end_date=${end}`);
      setExportsByType(typeResponse.data);

      const dateResponse = await axios.get(`/api/v1/analytics/exports/by-date?start_date=${start}&end_date=${end}`);
      setExportsByDate(dateResponse.data);

      const tagResponse = await axios.get(`/api/v1/analytics/exports/by-tag?start_date=${start}&end_date=${end}`);
      setExportsByTag(tagResponse.data);

      const recentResponse = await axios.get(`/api/v1/analytics/exports/recent?limit=10`);
      setRecentExports(recentResponse.data);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError('Failed to load analytics data. Please try again later.');
      setLoading(false);
    }
  };

  const exportsByTypeData = {
    labels: exportsByType.map(item => item.export_type),
    datasets: [
      {
        label: 'Exports by Type',
        data: exportsByType.map(item => item.count),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const exportsByDateData = {
    labels: exportsByDate.map(item => item.date),
    datasets: [
      {
        label: 'Exports by Date',
        data: exportsByDate.map(item => item.count),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const exportsByTagData = {
    labels: exportsByTag.map(item => item.tag),
    datasets: [
      {
        label: 'Exports by Tag',
        data: exportsByTag.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(201, 203, 207, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
        <Button variant="outline-danger" onClick={fetchAnalyticsData}>
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <Container fluid>
      {/* Date Range Selector */}
      <Row className="mb-4">
        <Col>
          <Card variant="outlined" className="p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Date Range</h5>
              <div className="d-flex">
                <div className="me-3">
                  <label className="form-label">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="form-control"
                  />
                </div>
                <div>
                  <label className="form-label">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Summary Cards */}
      {summary && (
        <Row className="mb-4">
          <Col md={3}>
            <Card variant="elevated" className="h-100">
              <motion.div 
                className="text-center p-4"
                variants={animations.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h3 className="display-4">{summary.total_exports}</h3>
                <div className="fw-bold">Total Exports</div>
              </motion.div>
            </Card>
          </Col>
          <Col md={3}>
            <Card variant="elevated" className="h-100">
              <motion.div 
                className="text-center p-4"
                variants={animations.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: 0.1 }}
              >
                <h3 className="display-4">{summary.total_records?.toLocaleString()}</h3>
                <div className="fw-bold">Records Exported</div>
              </motion.div>
            </Card>
          </Col>
          <Col md={3}>
            <Card variant="elevated" className="h-100">
              <motion.div 
                className="text-center p-4"
                variants={animations.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: 0.2 }}
              >
                <h3 className="display-4">{summary.unique_lists}</h3>
                <div className="fw-bold">Unique Lists</div>
              </motion.div>
            </Card>
          </Col>
          <Col md={3}>
            <Card variant="elevated" className="h-100">
              <motion.div 
                className="text-center p-4" 
                variants={animations.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ delay: 0.3 }}
              >
                <h3 className="display-4">{summary.unique_plans}</h3>
                <div className="fw-bold">Enrichment Plans</div>
              </motion.div>
            </Card>
          </Col>
        </Row>
      )}

      {/* Charts */}
      <Row className="mb-4">
        <Col md={6}>
          <Card variant="default" className="h-100">
            <motion.div 
              className="p-3"
              variants={animations.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h5 className="card-title mb-3">Exports by Type</h5>
              <div style={{ height: '300px' }}>
                <Pie data={exportsByTypeData} options={chartOptions} />
              </div>
            </motion.div>
          </Card>
        </Col>
        <Col md={6}>
          <Card variant="default" className="h-100">
            <motion.div 
              className="p-3"
              variants={animations.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: 0.1 }}
            >
              <h5 className="card-title mb-3">Exports by Tag</h5>
              <div style={{ height: '300px' }}>
                <Bar data={exportsByTagData} options={chartOptions} />
              </div>
            </motion.div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card variant="default">
            <motion.div 
              className="p-3"
              variants={animations.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: 0.2 }}
            >
              <h5 className="card-title mb-3">Exports Over Time</h5>
              <div style={{ height: '300px' }}>
                <Line data={exportsByDateData} options={chartOptions} />
              </div>
            </motion.div>
          </Card>
        </Col>
      </Row>

      {/* Recent Exports Table */}
      <Row>
        <Col>
          <Card variant="default">
            <motion.div 
              className="p-3"
              variants={animations.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: 0.3 }}
            >
              <h5 className="card-title mb-3">Recent Exports</h5>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Records</th>
                    <th>Date</th>
                    <th>List</th>
                    <th>Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExports.map((export_item) => (
                    <tr key={export_item.id}>
                      <td>{export_item.name}</td>
                      <td>{export_item.export_type}</td>
                      <td>
                        <span className={`badge bg-${export_item.status === 'completed' ? 'success' : export_item.status === 'pending' ? 'warning' : 'danger'}`}>
                          {export_item.status}
                        </span>
                      </td>
                      <td>{export_item.volume?.toLocaleString() || 0}</td>
                      <td>{new Date(export_item.created_at).toLocaleDateString()}</td>
                      <td>{export_item.list_name || '-'}</td>
                      <td>{export_item.plan_name || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </motion.div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ExportAnalyticsDashboard;
