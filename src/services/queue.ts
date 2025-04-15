import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || '',
  db: parseInt(process.env.REDIS_DB || '0')
});

const QUEUE_NAME = 'enrichment_jobs';
const PROCESSING_SET = 'enrichment_jobs:processing';

redisClient.on('connect', () => {
  logger.info('Connected to Redis');
});

redisClient.on('error', (error) => {
  logger.error(`Redis connection error: ${error.message}`);
});

/**
 * Enqueue a job in Redis
 * @param job Job data to enqueue
 * @returns Result object
 */
export const enqueueJob = async (job: any) => {
  try {
    const jobData = JSON.stringify(job);
    
    await redisClient.lpush(QUEUE_NAME, jobData);
    
    await redisClient.hset(
      PROCESSING_SET,
      job.job_id,
      JSON.stringify({
        enqueued_at: Date.now(),
        status: 'queued'
      })
    );
    
    logger.info(`Job ${job.job_id} added to queue ${QUEUE_NAME}`);
    return {
      success: true
    };
    
  } catch (error) {
    logger.error(`Error enqueueing job: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get job status from Redis
 * @param jobId Job ID
 * @returns Result object with job status
 */
export const getJobStatus = async (jobId: string) => {
  try {
    const statusData = await redisClient.hget(PROCESSING_SET, jobId);
    
    if (!statusData) {
      return {
        success: false,
        error: 'Job not found in Redis'
      };
    }
    
    const status = JSON.parse(statusData);
    
    return {
      success: true,
      data: status
    };
    
  } catch (error) {
    logger.error(`Error getting job status: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update job status in Redis
 * @param jobId Job ID
 * @param status New status
 * @param data Additional status data
 * @returns Result object
 */
export const updateJobStatus = async (
  jobId: string,
  status: string,
  data: any = {}
) => {
  try {
    const currentStatusData = await redisClient.hget(PROCESSING_SET, jobId);
    let currentStatus = {};
    
    if (currentStatusData) {
      currentStatus = JSON.parse(currentStatusData);
    }
    
    const updatedStatus = {
      ...currentStatus,
      ...data,
      status,
      updated_at: Date.now()
    };
    
    await redisClient.hset(
      PROCESSING_SET,
      jobId,
      JSON.stringify(updatedStatus)
    );
    
    logger.info(`Job ${jobId} status updated to ${status}`);
    return {
      success: true
    };
    
  } catch (error) {
    logger.error(`Error updating job status: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Get queue length
 * @returns Number of jobs in the queue
 */
export const getQueueLength = async () => {
  try {
    return await redisClient.llen(QUEUE_NAME);
  } catch (error) {
    logger.error(`Error getting queue length: ${error.message}`);
    return 0;
  }
};

/**
 * Get all jobs in the processing set
 * @returns List of job status data
 */
export const getAllJobs = async () => {
  try {
    const jobs = await redisClient.hgetall(PROCESSING_SET);
    
    const jobList = Object.entries(jobs).map(([jobId, statusData]) => {
      const status = JSON.parse(statusData);
      return {
        job_id: jobId,
        ...status
      };
    });
    
    return {
      success: true,
      data: jobList
    };
    
  } catch (error) {
    logger.error(`Error getting all jobs: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Clear all jobs from the queue
 * @returns Result object
 */
export const clearQueue = async () => {
  try {
    await redisClient.del(QUEUE_NAME);
    
    await redisClient.del(PROCESSING_SET);
    
    logger.info(`Queue ${QUEUE_NAME} cleared`);
    return {
      success: true
    };
    
  } catch (error) {
    logger.error(`Error clearing queue: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
};

export default {
  enqueueJob,
  getJobStatus,
  updateJobStatus,
  getQueueLength,
  getAllJobs,
  clearQueue
};
