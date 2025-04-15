"""
Queue module for the NU-DATA-UI enrichment service.
Provides Redis queue integration for job processing.
"""
import json
import logging
import time
from typing import Dict, Any, Optional, List

import redis

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class RedisQueue:
    """Redis-based queue implementation for job processing."""
    
    def __init__(
        self,
        host: str = 'localhost',
        port: int = 6379,
        db: int = 0,
        password: Optional[str] = None
    ):
        """
        Initialize Redis connection.
        
        Args:
            host: Redis host
            port: Redis port
            db: Redis database number
            password: Redis password
        """
        self.redis = redis.Redis(
            host=host,
            port=port,
            db=db,
            password=password,
            decode_responses=True
        )
        logger.info(f"Connected to Redis at {host}:{port}")
    
    def enqueue(self, queue_name: str, data: Dict[str, Any]) -> bool:
        """
        Add a job to the queue.
        
        Args:
            queue_name: Name of the queue
            data: Job data
            
        Returns:
            True if successful, False otherwise
        """
        try:
            job_data = json.dumps(data)
            
            self.redis.lpush(queue_name, job_data)
            
            job_id = data.get('job_id')
            if job_id:
                self.redis.hset(
                    f"{queue_name}:processing",
                    job_id,
                    json.dumps({
                        'enqueued_at': time.time(),
                        'status': 'queued'
                    })
                )
            
            logger.info(f"Job {job_id} added to queue {queue_name}")
            return True
            
        except Exception as e:
            logger.error(f"Error enqueueing job: {str(e)}")
            return False
    
    def dequeue(self, queue_name: str) -> Optional[Dict[str, Any]]:
        """
        Get a job from the queue.
        
        Args:
            queue_name: Name of the queue
            
        Returns:
            Job data or None if queue is empty
        """
        try:
            job_data = self.redis.rpop(queue_name)
            
            if not job_data:
                return None
            
            job = json.loads(job_data)
            
            job_id = job.get('job_id')
            if job_id:
                self.redis.hset(
                    f"{queue_name}:processing",
                    job_id,
                    json.dumps({
                        'dequeued_at': time.time(),
                        'status': 'processing'
                    })
                )
            
            logger.info(f"Job {job_id} dequeued from {queue_name}")
            return job
            
        except Exception as e:
            logger.error(f"Error dequeuing job: {str(e)}")
            return None
    
    def get_queue_length(self, queue_name: str) -> int:
        """
        Get the number of jobs in the queue.
        
        Args:
            queue_name: Name of the queue
            
        Returns:
            Number of jobs in the queue
        """
        try:
            return self.redis.llen(queue_name)
        except Exception as e:
            logger.error(f"Error getting queue length: {str(e)}")
            return 0
    
    def get_job_status(self, queue_name: str, job_id: str) -> Optional[Dict[str, Any]]:
        """
        Get the status of a job.
        
        Args:
            queue_name: Name of the queue
            job_id: ID of the job
            
        Returns:
            Job status data or None if not found
        """
        try:
            status_data = self.redis.hget(f"{queue_name}:processing", job_id)
            
            if not status_data:
                return None
            
            return json.loads(status_data)
            
        except Exception as e:
            logger.error(f"Error getting job status: {str(e)}")
            return None
    
    def update_job_status(
        self,
        queue_name: str,
        job_id: str,
        status: str,
        data: Optional[Dict[str, Any]] = None
    ) -> bool:
        """
        Update the status of a job.
        
        Args:
            queue_name: Name of the queue
            job_id: ID of the job
            status: New status
            data: Additional status data
            
        Returns:
            True if successful, False otherwise
        """
        try:
            current_status = self.get_job_status(queue_name, job_id) or {}
            
            current_status.update({
                'status': status,
                'updated_at': time.time()
            })
            
            if data:
                current_status.update(data)
            
            self.redis.hset(
                f"{queue_name}:processing",
                job_id,
                json.dumps(current_status)
            )
            
            logger.info(f"Job {job_id} status updated to {status}")
            return True
            
        except Exception as e:
            logger.error(f"Error updating job status: {str(e)}")
            return False
    
    def get_all_jobs(self, queue_name: str) -> List[Dict[str, Any]]:
        """
        Get all jobs in the processing set.
        
        Args:
            queue_name: Name of the queue
            
        Returns:
            List of job status data
        """
        try:
            jobs = self.redis.hgetall(f"{queue_name}:processing")
            
            return [json.loads(status) for status in jobs.values()]
            
        except Exception as e:
            logger.error(f"Error getting all jobs: {str(e)}")
            return []
    
    def clear_queue(self, queue_name: str) -> bool:
        """
        Clear all jobs from the queue.
        
        Args:
            queue_name: Name of the queue
            
        Returns:
            True if successful, False otherwise
        """
        try:
            self.redis.delete(queue_name)
            
            self.redis.delete(f"{queue_name}:processing")
            
            logger.info(f"Queue {queue_name} cleared")
            return True
            
        except Exception as e:
            logger.error(f"Error clearing queue: {str(e)}")
            return False
