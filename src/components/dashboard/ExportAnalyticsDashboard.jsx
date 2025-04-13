import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Spinner, Alert } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Card from '../../components/design/Card';
import ResponsiveAnimation from '../animations/ResponsiveAnimation'; // Import the wrapper

Chart.register(...registerables);

const ExportAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [byDateData, setByDateData] = useState([]);
  const [byTagData, setByTagData] = useState([]);
  const [planUsage, setPlanUsage] = useState([]);
  const [highVolumeExports, setHighVolumeExports] = useState([]);
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)); // 30 days ago
  const [endDate, setEndDate] = useState(new Date());
  const [groupBy, setGroupBy] = useState('day');

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const summaryResponse = await axios.get('/api/v1/analytics/exports/summary');
      setSummary(summaryResponse.data);
      
      const byDateResponse = await axios.get('/api/v1/analytics/exports/by-date', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          groupBy
        }
      });
      setByDateData(byDateResponse.data);
      
      const byTagResponse = await axios.get('/api/v1/analytics/exports/by-tag');
      setByTagData(byTagResponse.data);
      
      const planUsageResponse = await axios.get('/api/v1/analytics/enrichment-plans/usage');
      setPlanUsage(planUsageResponse.data);
      
      const highVolumeResponse = await axios.get('/api/v1/analytics/exports/high-volume', {
        params: { limit: 10 }
      });
      setHighVolumeExports(highVolumeResponse.data);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError('Failed to fetch analytics data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  useEffect(() => {
    fetchAnalyticsData();
  }, [startDate, endDate, groupBy]);

  const handleExportCSV = () => {
    window.open(`/api/v1/analytics/exports/download/csv?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`, '_blank');
  };

  const handleExportPDF = () => {
    window.open('/api/v1/analytics/exports/download/pdf', '_blank');
  };

  const prepareExportTypeChart = () => {
    if (!summary || !summary.export_type_breakdown) return null;
    
    const labels = Object.keys(summary.export_type_breakdown);
    const data = Object.values(summary.export_type_breakdown);
    
    return {
      labels,
      datasets: [
        {
          label: 'Exports by Method',
          data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  const prepareWeeklyVolumeChart = () => {
    if (!byDateData || byDateData.length === 0) return null;
    
    const sortedData = [...byDateData].sort((a, b) => new Date(a.time_period) - new Date(b.time_period));
    
    return {
      labels: sortedData.map(item => {
        const date = new Date(item.time_period);
        return date.toLocaleDateString();
      }),
      datasets: [
        {
          label: 'Export Count',
          data: sortedData.map(item => item.export_count),
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        },
        {
          label: 'Records Exported',
          data: sortedData.map(item => item.total_records),
          fill: false,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          tension: 0.1,
          yAxisID: 'y1'
        }
      ]
    };
  };

  const prepareTagChart = () => {
    if (!byTagData || byTagData.length === 0) return null;
    
    const topTags = [...byTagData]
      .sort((a, b) => b.export_count - a.export_count)
      .slice(0, 10);
    
    return {
      labels: topTags.map(item => item.tag || 'Untagged'),
      datasets: [
        {
          label: 'Exports by Tag',
          data: topTags.map(item => item.export_count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)',
            'rgba(40, 159, 64, 0.6)',
            'rgba(210, 199, 199, 0.6)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  const lineOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Export Count'
        }
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        title: {
          display: true,
          text: 'Records Exported'
        },
        grid: {
          drawOnChartArea: false
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading export analytics...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Export Analytics Dashboard</h2>
      
      {/* Filters and Export Buttons */}
      <Card variant="outlined" className="mb-4" animationType="none"> {/* Disable Card's own animation */}
        <ResponsiveAnimation type="fade" className="p-3">
          <Row>
            <Col md={3}>
              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </Col>
            <Col md={3}>
              <div className="mb-3">
                <label className="form-label">Group By</label>
                <select
                  className="form-select"
                  value={groupBy}
                  onChange={e => setGroupBy(e.target.value)}
                >
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
              </div>
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <div className="mb-3 d-flex gap-2">
                <Button variant="outline-primary" onClick={handleExportCSV}>
                  Export CSV
                </Button>
                <Button variant="outline-secondary" onClick={handleExportPDF}>
                  Export PDF
                </Button>
              </div>
            </Col>
          </Row>
        </ResponsiveAnimation>
      </Card>
      
      {/* Summary Cards */}
      {summary && (
        <Row className="mb-4">
          <Col md={3}>
            {/* Card component already has animation, no need to double wrap unless specific inner animation is needed */}
            <Card variant="elevated" className="h-100" animationType="fade">
              <div className="text-center p-4">
                <h3 className="display-4">{summary.total_exports}</h3>
                <div className="fw-bold">Total Exports</div>
              </div>
            </Card>
          </Col>
          <Col md={3}>
            <Card variant="elevated" className="h-100" animationType="fade" animationDelay={0.1}>
              <div className="text-center p-4">
                <h3 className="display-4">{summary.total_records?.toLocaleString()}</h3>
                <div className="fw-bold">Records Exported</div>
              </div>
            </Card>
          </Col>
          <Col md={3}>
            <Card variant="elevated" className="h-100" animationType="fade" animationDelay={0.2}>
              <div className="text-center p-4">
                <h3 className="display-4">{summary.unique_lists}</h3>
                <div className="fw-bold">Unique Lists</div>
              </div>
            </Card>
          </Col>
          <Col md={3}>
            <Card variant="elevated" className="h-100" animationType="fade" animationDelay={0.3}>
              <div className="text-center p-4">
                <h3 className="display-4">{summary.unique_plans}</h3>
                <div className="fw-bold">Enrichment Plans</div>
              </div>
            </Card>
          </Col>
        </Row>
      )}
      
      {/* Charts Row */}
      <Row className="mb-4">
        {/* Export Method Breakdown */}
        <Col md={4}>
          <Card variant="default" className="h-100" animationType="slideUp">
            <div className="p-3">
              <h5 className="card-title mb-3">Export Method Breakdown</h5>
              <div style={{ height: '300px' }}>
                {prepareExportTypeChart() ? (
                  <Bar data={prepareExportTypeChart()} options={barOptions} />
                ) : (
                  <div className="text-center mt-5">No data available</div>
                )}
              </div>
            </div>
          </Card>
        </Col>
        
        {/* Weekly Export Volumes */}
        <Col md={4}>
          <Card variant="default" className="h-100" animationType="slideUp" animationDelay={0.1}>
            <div className="p-3">
              <h5 className="card-title mb-3">Export Volumes Over Time</h5>
              <div style={{ height: '300px' }}>
                {prepareWeeklyVolumeChart() ? (
                  <Line data={prepareWeeklyVolumeChart()} options={lineOptions} />
                ) : (
                  <div className="text-center mt-5">No data available</div>
                )}
              </div>
            </div>
          </Card>
        </Col>
        
        {/* Tag Breakdown */}
        <Col md={4}>
          <Card variant="default" className="h-100" animationType="slideUp" animationDelay={0.2}>
            <div className="p-3">
              <h5 className="card-title mb-3">Exports by Tag</h5>
              <div style={{ height: '300px' }}>
                {prepareTagChart() ? (
                  <Pie data={prepareTagChart()} options={pieOptions} />
                ) : (
                  <div className="text-center mt-5">No data available</div>
                )}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* High Volume Exports Table */}
      <Card variant="default" className="mb-4" animationType="slideUp" animationDelay={0.3}>
        <div className="p-3">
          <h5 className="card-title mb-3">Recent High-Volume Exports</h5>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Export Type</th>
                <th>Volume</th>
                <th>List</th>
                <th>Enrichment Plan</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {highVolumeExports.length > 0 ? (
                highVolumeExports.map(export_ => (
                  <tr key={export_.id}>
                    <td>{export_.name || 'Unnamed Export'}</td>
                    <td>{export_.export_type}</td>
                    <td>{export_.volume?.toLocaleString()}</td>
                    <td>{export_.list_name || 'N/A'}</td>
                    <td>{export_.plan_name || 'N/A'}</td>
                    <td>{new Date(export_.created_at).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No high-volume exports found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>
      
      {/* Enrichment Plan Usage */}
      <Card variant="default" className="mb-4" animationType="slideUp" animationDelay={0.4}>
        <div className="p-3">
          <h5 className="card-title mb-3">Enrichment Plan Usage</h5>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Export Count</th>
                <th>Total Records</th>
              </tr>
            </thead>
            <tbody>
              {planUsage.length > 0 ? (
                planUsage.map(plan => (
                  <tr key={plan.plan_id}>
                    <td>{plan.plan_name}</td>
                    <td>{plan.export_count}</td>
                    <td>{plan.total_records?.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No enrichment plan usage data found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
};

export default ExportAnalyticsDashboard;
