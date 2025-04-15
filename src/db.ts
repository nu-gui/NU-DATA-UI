import { Pool } from 'pg';
import logger from './utils/logger';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'nu_data',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  logger.info('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  logger.error(`PostgreSQL error: ${err.message}`);
});

/**
 * Create a job record in the database
 * @param job Job data
 * @returns Result object
 */
export const createJobRecord = async (job: any) => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `INSERT INTO enrichment_queue_jobs (
        job_id, list_id, plan_id, status, message, created_by, created_at, options
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        job.job_id,
        job.list_id,
        job.plan_id,
        job.status,
        job.message || null,
        job.created_by,
        job.created_at,
        job.options ? JSON.stringify(job.options) : null
      ]
    );
    
    return {
      success: true,
      data: result.rows[0]
    };
    
  } catch (error) {
    logger.error(`Error creating job record: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  } finally {
    client.release();
  }
};

/**
 * Update job status in the database
 * @param jobId Job ID
 * @param status New status
 * @param message Optional status message
 * @returns Result object
 */
export const updateJobStatus = async (
  jobId: string,
  status: string,
  message: string | null = null
) => {
  const client = await pool.connect();
  
  try {
    const now = new Date();
    let completedAt = null;
    
    if (status === 'completed' || status === 'failed') {
      completedAt = now as any;
    }
    
    const result = await client.query(
      `UPDATE enrichment_queue_jobs
      SET status = $1, message = $2, updated_at = $3, completed_at = $4
      WHERE job_id = $5
      RETURNING *`,
      [status, message, now, completedAt, jobId]
    );
    
    if (result.rowCount === 0) {
      return {
        success: false,
        error: 'Job not found'
      };
    }
    
    return {
      success: true,
      data: result.rows[0]
    };
    
  } catch (error) {
    logger.error(`Error updating job status: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  } finally {
    client.release();
  }
};

/**
 * Get job by ID
 * @param jobId Job ID
 * @returns Result object with job data
 */
export const getJobById = async (jobId: string) => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `SELECT * FROM enrichment_queue_jobs WHERE job_id = $1`,
      [jobId]
    );
    
    if (result.rows.length === 0) {
      return {
        success: false,
        error: 'Job not found'
      };
    }
    
    return {
      success: true,
      data: result.rows[0]
    };
    
  } catch (error) {
    logger.error(`Error getting job: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  } finally {
    client.release();
  }
};

/**
 * Get all jobs
 * @param limit Maximum number of jobs to return
 * @param offset Offset for pagination
 * @returns Result object with job data
 */
export const getAllJobs = async (limit: number = 100, offset: number = 0) => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `SELECT * FROM enrichment_queue_jobs
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    
    return {
      success: true,
      data: result.rows
    };
    
  } catch (error) {
    logger.error(`Error getting all jobs: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  } finally {
    client.release();
  }
};

/**
 * Get jobs by status
 * @param status Job status
 * @param limit Maximum number of jobs to return
 * @param offset Offset for pagination
 * @returns Result object with job data
 */
export const getJobsByStatus = async (
  status: string,
  limit: number = 100,
  offset: number = 0
) => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `SELECT * FROM enrichment_queue_jobs
      WHERE status = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3`,
      [status, limit, offset]
    );
    
    return {
      success: true,
      data: result.rows
    };
    
  } catch (error) {
    logger.error(`Error getting jobs by status: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  } finally {
    client.release();
  }
};

export default {
  createJobRecord,
  updateJobStatus,
  getJobById,
  getAllJobs,
  getJobsByStatus
};
