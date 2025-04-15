import Joi from 'joi';

/**
 * Job status enum
 */
export enum JobStatus {
  PENDING = 'pending',
  QUEUED = 'queued',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

/**
 * Job payload interface
 */
export interface JobPayload {
  list_id: string;
  plan_id: string;
  options?: {
    priority?: number;
    notify_email?: string;
    webhook_url?: string;
  };
}

/**
 * Job record interface
 */
export interface JobRecord {
  job_id: string;
  list_id: string;
  plan_id: string;
  status: JobStatus;
  message?: string;
  created_by: string;
  created_at: Date;
  updated_at?: Date;
  completed_at?: Date;
  options?: {
    priority?: number;
    notify_email?: string;
    webhook_url?: string;
  };
}

/**
 * Job payload validation schema
 */
const jobPayloadSchema = Joi.object({
  list_id: Joi.string().uuid().required(),
  plan_id: Joi.string().uuid().required(),
  options: Joi.object({
    priority: Joi.number().min(1).max(10),
    notify_email: Joi.string().email(),
    webhook_url: Joi.string().uri()
  })
});

/**
 * Validate job payload
 * @param payload Job payload to validate
 * @returns Validation result
 */
export const validateJobPayload = (payload: any) => {
  const { error } = jobPayloadSchema.validate(payload, { abortEarly: false });
  
  if (error) {
    return {
      valid: false,
      errors: error.details.map(detail => detail.message)
    };
  }
  
  return {
    valid: true,
    errors: []
  };
};

/**
 * Create job record object
 * @param data Job data
 * @returns Job record
 */
export const createJobRecord = (data: any): JobRecord => {
  return {
    job_id: data.job_id,
    list_id: data.list_id,
    plan_id: data.plan_id,
    status: data.status || JobStatus.PENDING,
    message: data.message,
    created_by: data.created_by,
    created_at: data.created_at || new Date(),
    updated_at: data.updated_at,
    completed_at: data.completed_at,
    options: data.options
  };
};

export default {
  validateJobPayload,
  createJobRecord,
  JobStatus
};
