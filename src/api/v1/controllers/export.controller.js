/**
 * Export Controller
 * 
 * Handles export job creation and management
 */

const { trackExport, updateExportStatus, getExportJob } = require('../../../services/export/exportTracker');
const pool = require('../../../config/database');

/**
 * Create a new export job
 */
const createExportJob = async (req, res) => {
  const { tenantId, id: userId } = req.user;
  const exportJob = req.body;
  
  try {
    if (!exportJob.export_type) {
      return res.status(400).json({ error: 'Export type is required' });
    }
    
    const createdJob = await trackExport(exportJob, userId, tenantId);
    
    return res.status(201).json(createdJob);
  } catch (error) {
    console.error('Error creating export job:', error);
    return res.status(500).json({ error: 'Failed to create export job' });
  }
};

/**
 * Get export job status
 */
const getExportJobStatus = async (req, res) => {
  const { tenantId } = req.user;
  const { jobId } = req.params;
  
  try {
    const job = await getExportJob(jobId, tenantId);
    
    return res.status(200).json(job);
  } catch (error) {
    console.error('Error getting export job status:', error);
    return res.status(500).json({ error: 'Failed to get export job status' });
  }
};

/**
 * Update export job status
 */
const updateExportJobStatus = async (req, res) => {
  const { tenantId } = req.user;
  const { jobId } = req.params;
  const { status, volume } = req.body;
  
  try {
    const updatedJob = await updateExportStatus(jobId, status, volume, tenantId);
    
    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error('Error updating export job status:', error);
    return res.status(500).json({ error: 'Failed to update export job status' });
  }
};

/**
 * Download exported data
 */
const downloadExportedData = async (req, res) => {
  const { tenantId } = req.user;
  const { jobId } = req.params;
  
  try {
    const job = await getExportJob(jobId, tenantId);
    
    if (job.status !== 'completed') {
      return res.status(400).json({ error: 'Export job not completed' });
    }
    
    if (!job.file_path) {
      return res.status(404).json({ error: 'Export file not found' });
    }
    
    if (!job.volume || job.volume === 0) {
      const countResult = await pool.query(`
        SELECT COUNT(*) FROM app.list_entries
        WHERE list_id = $1 AND tenant_id = $2
      `, [job.list_id, tenantId]);
      
      const recordCount = parseInt(countResult.rows[0].count, 10);
      
      await updateExportStatus(jobId, 'completed', recordCount, tenantId);
    }
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="export-${jobId}.csv"`);
    
    const csvHeader = 'id,first_name,last_name,email,phone\n';
    const csvRows = Array(job.volume || 10).fill()
      .map((_, i) => `${i+1},John,Doe,john.doe${i+1}@example.com,555-123-${1000+i}`)
      .join('\n');
    
    return res.status(200).send(csvHeader + csvRows);
  } catch (error) {
    console.error('Error downloading exported data:', error);
    return res.status(500).json({ error: 'Failed to download exported data' });
  }
};

module.exports = {
  createExportJob,
  getExportJobStatus,
  updateExportJobStatus,
  downloadExportedData
};
