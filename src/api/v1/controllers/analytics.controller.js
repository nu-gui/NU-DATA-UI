/**
 * Analytics Controller
 * 
 * Handles export analytics and dashboard metrics
 */

const pool = require('../../../config/database');

/**
 * Get export analytics summary
 */
const getExportAnalyticsSummary = async (req, res) => {
  const { tenantId } = req.user;
  
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS total_exports,
        SUM(volume) AS total_records,
        COUNT(DISTINCT list_id) AS unique_lists,
        COUNT(DISTINCT enrichment_plan_id) AS unique_plans,
        jsonb_object_agg(
          COALESCE(export_type, 'unknown'), 
          COUNT(*)
        ) AS export_type_breakdown
      FROM app.export_jobs
      WHERE tenant_id = $1
    `, [tenantId]);
    
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching export analytics summary:', error);
    return res.status(500).json({ error: 'Failed to fetch export analytics summary' });
  }
};

/**
 * Get export analytics by date range
 */
const getExportAnalyticsByDate = async (req, res) => {
  const { tenantId } = req.user;
  const { startDate, endDate, groupBy = 'day' } = req.query;
  
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    let timeFormat;
    switch (groupBy) {
      case 'week':
        timeFormat = 'week';
        break;
      case 'month':
        timeFormat = 'month';
        break;
      case 'day':
      default:
        timeFormat = 'day';
    }
    
    const result = await pool.query(`
      SELECT 
        DATE_TRUNC($1, export_date) AS time_period,
        COUNT(*) AS export_count,
        SUM(volume) AS total_records,
        jsonb_object_agg(
          COALESCE(export_type, 'unknown'), 
          COUNT(*)
        ) AS export_type_breakdown
      FROM app.export_jobs
      WHERE 
        tenant_id = $2
        ${startDate ? 'AND export_date >= $3' : ''}
        ${endDate ? `AND export_date <= $${startDate ? '4' : '3'}` : ''}
      GROUP BY DATE_TRUNC($1, export_date)
      ORDER BY time_period DESC
    `, [
      timeFormat, 
      tenantId,
      ...(startDate ? [startDate] : []),
      ...(endDate ? [endDate] : [])
    ]);
    
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching export analytics by date:', error);
    return res.status(500).json({ error: 'Failed to fetch export analytics by date' });
  }
};

/**
 * Get export analytics by tag
 */
const getExportAnalyticsByTag = async (req, res) => {
  const { tenantId } = req.user;
  
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    const result = await pool.query(`
      WITH tag_counts AS (
        SELECT
          unnest(tag_summary) AS tag,
          COUNT(*) AS export_count,
          SUM(volume) AS total_records
        FROM app.export_jobs
        WHERE tenant_id = $1
        GROUP BY unnest(tag_summary)
      )
      SELECT
        tag,
        export_count,
        total_records
      FROM tag_counts
      ORDER BY export_count DESC
    `, [tenantId]);
    
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching export analytics by tag:', error);
    return res.status(500).json({ error: 'Failed to fetch export analytics by tag' });
  }
};

/**
 * Get enrichment plan usage
 */
const getEnrichmentPlanUsage = async (req, res) => {
  const { tenantId } = req.user;
  
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    const result = await pool.query(`
      SELECT
        e.id AS plan_id,
        e.name AS plan_name,
        COUNT(j.id) AS export_count,
        SUM(j.volume) AS total_records
      FROM
        app.enrichment_plans e
      LEFT JOIN
        app.export_jobs j ON e.id = j.enrichment_plan_id AND j.tenant_id = e.tenant_id
      WHERE
        e.tenant_id = $1
      GROUP BY
        e.id, e.name
      ORDER BY
        export_count DESC
    `, [tenantId]);
    
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching enrichment plan usage:', error);
    return res.status(500).json({ error: 'Failed to fetch enrichment plan usage' });
  }
};

/**
 * Get recent high-volume exports
 */
const getRecentHighVolumeExports = async (req, res) => {
  const { tenantId } = req.user;
  const { limit = 10 } = req.query;
  
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    const result = await pool.query(`
      SELECT
        e.id,
        e.name,
        e.export_type,
        e.volume,
        e.created_at,
        l.name AS list_name,
        p.name AS plan_name
      FROM
        app.export_jobs e
      LEFT JOIN
        app.lists l ON e.list_id = l.id
      LEFT JOIN
        app.enrichment_plans p ON e.enrichment_plan_id = p.id
      WHERE
        e.tenant_id = $1
      ORDER BY
        e.volume DESC, e.created_at DESC
      LIMIT $2
    `, [tenantId, limit]);
    
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching recent high-volume exports:', error);
    return res.status(500).json({ error: 'Failed to fetch recent high-volume exports' });
  }
};

/**
 * Export analytics data as CSV
 */
const exportAnalyticsCSV = async (req, res) => {
  const { tenantId } = req.user;
  const { startDate, endDate } = req.query;
  
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    const result = await pool.query(`
      SELECT
        e.id,
        e.name,
        e.export_type,
        e.volume,
        e.created_at,
        l.name AS list_name,
        p.name AS plan_name,
        array_to_string(e.tag_summary, ',') AS tags
      FROM
        app.export_jobs e
      LEFT JOIN
        app.lists l ON e.list_id = l.id
      LEFT JOIN
        app.enrichment_plans p ON e.enrichment_plan_id = p.id
      WHERE
        e.tenant_id = $1
        ${startDate ? 'AND e.export_date >= $2' : ''}
        ${endDate ? `AND e.export_date <= $${startDate ? '3' : '2'}` : ''}
      ORDER BY
        e.created_at DESC
    `, [
      tenantId,
      ...(startDate ? [startDate] : []),
      ...(endDate ? [endDate] : [])
    ]);
    
    const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
    const csvStringifier = createCsvStringifier({
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'export_type', title: 'Export Type' },
        { id: 'volume', title: 'Volume' },
        { id: 'created_at', title: 'Date' },
        { id: 'list_name', title: 'List' },
        { id: 'plan_name', title: 'Enrichment Plan' },
        { id: 'tags', title: 'Tags' }
      ]
    });
    
    const csvHeader = csvStringifier.getHeaderString();
    const csvBody = csvStringifier.stringifyRecords(result.rows);
    const csvContent = csvHeader + csvBody;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="export-analytics.csv"');
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('Error exporting analytics as CSV:', error);
    return res.status(500).json({ error: 'Failed to export analytics as CSV' });
  }
};

/**
 * Export analytics data as PDF
 */
const exportAnalyticsPDF = async (req, res) => {
  const { tenantId } = req.user;
  
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    const summaryResult = await pool.query(`
      SELECT 
        COUNT(*) AS total_exports,
        SUM(volume) AS total_records,
        COUNT(DISTINCT list_id) AS unique_lists,
        COUNT(DISTINCT enrichment_plan_id) AS unique_plans
      FROM app.export_jobs
      WHERE tenant_id = $1
    `, [tenantId]);
    
    const typeResult = await pool.query(`
      SELECT
        export_type,
        COUNT(*) AS export_count,
        SUM(volume) AS total_records
      FROM app.export_jobs
      WHERE tenant_id = $1
      GROUP BY export_type
      ORDER BY export_count DESC
    `, [tenantId]);
    
    const weeklyResult = await pool.query(`
      SELECT
        DATE_TRUNC('week', export_date) AS week_start,
        COUNT(*) AS export_count,
        SUM(volume) AS total_records
      FROM app.export_jobs
      WHERE tenant_id = $1
      GROUP BY DATE_TRUNC('week', export_date)
      ORDER BY week_start DESC
      LIMIT 10
    `, [tenantId]);
    
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="export-analytics.pdf"');
    
    doc.pipe(res);
    
    doc.fontSize(25).text('Export Analytics Report', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(16).text('Summary', { underline: true });
    doc.moveDown(0.5);
    const summary = summaryResult.rows[0];
    doc.fontSize(12).text(`Total Exports: ${summary.total_exports}`);
    doc.fontSize(12).text(`Total Records: ${summary.total_records}`);
    doc.fontSize(12).text(`Unique Lists: ${summary.unique_lists}`);
    doc.fontSize(12).text(`Unique Enrichment Plans: ${summary.unique_plans}`);
    doc.moveDown();
    
    doc.fontSize(16).text('Export Type Breakdown', { underline: true });
    doc.moveDown(0.5);
    typeResult.rows.forEach(row => {
      doc.fontSize(12).text(`${row.export_type}: ${row.export_count} exports (${row.total_records} records)`);
    });
    doc.moveDown();
    
    doc.fontSize(16).text('Weekly Export Trends', { underline: true });
    doc.moveDown(0.5);
    weeklyResult.rows.forEach(row => {
      const weekDate = new Date(row.week_start).toLocaleDateString();
      doc.fontSize(12).text(`Week of ${weekDate}: ${row.export_count} exports (${row.total_records} records)`);
    });
    
    doc.end();
  } catch (error) {
    console.error('Error exporting analytics as PDF:', error);
    return res.status(500).json({ error: 'Failed to export analytics as PDF' });
  }
};

module.exports = {
  getExportAnalyticsSummary,
  getExportAnalyticsByDate,
  getExportAnalyticsByTag,
  getEnrichmentPlanUsage,
  getRecentHighVolumeExports,
  exportAnalyticsCSV,
  exportAnalyticsPDF
};
