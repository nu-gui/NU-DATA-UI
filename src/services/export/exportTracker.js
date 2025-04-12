/**
 * Export Tracker Service
 * 
 * Tracks export actions and updates analytics data
 */

const pool = require('../../config/database');

/**
 * Track an export job for analytics
 * @param {Object} exportJob - Export job details
 * @param {UUID} userId - User ID who triggered the export
 * @param {UUID} tenantId - Tenant ID
 * @returns {Promise<Object>} Created export job record
 */
const trackExport = async (exportJob, userId, tenantId) => {
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    let tagSummary = [];
    if (exportJob.list_id) {
      const listResult = await pool.query(
        'SELECT tags FROM app.lists WHERE id = $1 AND tenant_id = $2',
        [exportJob.list_id, tenantId]
      );
      
      if (listResult.rows.length > 0) {
        tagSummary = listResult.rows[0].tags || [];
      }
    }
    
    const result = await pool.query(`
      INSERT INTO app.export_jobs (
        name,
        filter_criteria,
        selected_fields,
        export_type,
        connection_id,
        status,
        volume,
        list_id,
        enrichment_plan_id,
        tag_summary,
        tenant_id,
        triggered_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [
      exportJob.name || 'Unnamed Export',
      exportJob.filter_criteria || {},
      exportJob.selected_fields || [],
      exportJob.export_type,
      exportJob.connection_id,
      exportJob.status || 'pending',
      exportJob.volume || 0,
      exportJob.list_id,
      exportJob.enrichment_plan_id,
      tagSummary,
      tenantId,
      userId
    ]);
    
    return result.rows[0];
  } catch (error) {
    console.error('Error tracking export job:', error);
    throw new Error('Failed to track export job');
  }
};

/**
 * Update export job status and volume
 * @param {UUID} jobId - Export job ID
 * @param {string} status - New status
 * @param {number} volume - Number of records exported
 * @param {UUID} tenantId - Tenant ID
 * @returns {Promise<Object>} Updated export job record
 */
const updateExportStatus = async (jobId, status, volume, tenantId) => {
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    const result = await pool.query(`
      UPDATE app.export_jobs
      SET status = $1, volume = $2, updated_at = NOW()
      WHERE id = $3 AND tenant_id = $4
      RETURNING *
    `, [status, volume, jobId, tenantId]);
    
    if (result.rows.length === 0) {
      throw new Error('Export job not found');
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('Error updating export job status:', error);
    throw new Error('Failed to update export job status');
  }
};

/**
 * Get export job details
 * @param {UUID} jobId - Export job ID
 * @param {UUID} tenantId - Tenant ID
 * @returns {Promise<Object>} Export job record
 */
const getExportJob = async (jobId, tenantId) => {
  try {
    await pool.query("SELECT set_config('app.current_tenant_id', $1, true)", [tenantId]);
    
    const result = await pool.query(`
      SELECT
        e.*,
        l.name AS list_name,
        p.name AS plan_name,
        u.email AS triggered_by_email
      FROM
        app.export_jobs e
      LEFT JOIN
        app.lists l ON e.list_id = l.id
      LEFT JOIN
        app.enrichment_plans p ON e.enrichment_plan_id = p.id
      LEFT JOIN
        auth.users u ON e.triggered_by = u.id
      WHERE
        e.id = $1 AND e.tenant_id = $2
    `, [jobId, tenantId]);
    
    if (result.rows.length === 0) {
      throw new Error('Export job not found');
    }
    
    return result.rows[0];
  } catch (error) {
    console.error('Error getting export job:', error);
    throw new Error('Failed to get export job');
  }
};

module.exports = {
  trackExport,
  updateExportStatus,
  getExportJob
};
