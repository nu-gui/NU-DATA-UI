import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validateJobPayload } from '../models/job';
import { enqueueJob, getJobStatus } from '../services/queue';
import { createJobRecord, updateJobStatus, getJobById } from '../db';
import logger from '../utils/logger';

const router = express.Router();

/**
 * Submit a new enrichment job
 * POST /v1/enrichment/job
 */
router.post('/job', async (req, res) => {
  try {
    const { list_id, plan_id } = req.body;
    
    const validationResult = validateJobPayload(req.body);
    if (!validationResult.valid) {
      logger.error(`Invalid job payload: ${validationResult.errors.join(', ')}`);
      return res.status(400).json({
        success: false,
        error: 'Invalid job payload',
        details: validationResult.errors
      });
    }
    
    const job_id = uuidv4();
    
    const jobRecord = await createJobRecord({
      job_id,
      list_id,
      plan_id,
      status: 'pending',
      created_by: req.user?.id || 'system',
      created_at: new Date()
    });
    
    if (!jobRecord.success) {
      logger.error(`Failed to create job record: ${jobRecord.error}`);
      return res.status(500).json({
        success: false,
        error: 'Failed to create job record'
      });
    }
    
    const enqueueResult = await enqueueJob({
      job_id,
      list_id,
      plan_id
    });
    
    if (!enqueueResult.success) {
      await updateJobStatus(job_id, 'failed', enqueueResult.error);
      
      logger.error(`Failed to enqueue job: ${enqueueResult.error}`);
      return res.status(500).json({
        success: false,
        error: 'Failed to enqueue job',
        job_id
      });
    }
    
    await updateJobStatus(job_id, 'queued');
    
    logger.info(`Job ${job_id} submitted successfully`);
    return res.status(201).json({
      success: true,
      job_id,
      status: 'queued'
    });
    
  } catch (error) {
    logger.error(`Error submitting job: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * Get job status
 * GET /v1/enrichment/job/:id
 */
router.get('/job/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const jobRecord = await getJobById(id);
    
    if (!jobRecord.success || !jobRecord.data) {
      logger.error(`Job not found: ${id}`);
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }
    
    const jobStatus = await getJobStatus(id);
    
    const job = {
      ...jobRecord.data,
      queue_status: jobStatus.success ? jobStatus.data : null
    };
    
    logger.info(`Job ${id} status retrieved`);
    return res.status(200).json({
      success: true,
      job
    });
    
  } catch (error) {
    logger.error(`Error getting job status: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router;
