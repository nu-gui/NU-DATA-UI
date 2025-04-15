"""
Main worker module for the NU-DATA-UI enrichment service.
Handles Redis-enqueued tasks for data enrichment and scoring.
"""
import logging
import os
import time
from typing import Dict, Any, List, Optional

from .config import get_config
from .db import get_db_connection, close_db_connection
from .queue import RedisQueue
from .score import calculate_rpc_score

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class EnrichmentWorker:
    """Worker class that processes enrichment jobs from Redis queue."""
    
    def __init__(self):
        """Initialize the worker with configuration and connections."""
        self.config = get_config()
        self.db = get_db_connection()
        self.queue = RedisQueue(
            host=self.config.get('REDIS_HOST', 'localhost'),
            port=int(self.config.get('REDIS_PORT', 6379)),
            db=int(self.config.get('REDIS_DB', 0)),
            password=self.config.get('REDIS_PASSWORD', None)
        )
        self.running = False
        
    def start(self):
        """Start the worker to process jobs from the queue."""
        self.running = True
        logger.info("Starting enrichment worker...")
        
        try:
            while self.running:
                job = self.queue.dequeue('enrichment_jobs')
                
                if job:
                    logger.info(f"Processing job: {job.get('job_id')}")
                    self._process_job(job)
                else:
                    time.sleep(1)
        except KeyboardInterrupt:
            logger.info("Worker stopped by user")
        except Exception as e:
            logger.error(f"Worker error: {str(e)}")
        finally:
            self.stop()
            
    def stop(self):
        """Stop the worker and clean up resources."""
        self.running = False
        close_db_connection(self.db)
        logger.info("Worker stopped")
        
    def _process_job(self, job: Dict[str, Any]):
        """
        Process an enrichment job.
        
        Args:
            job: Dictionary containing job details
        """
        job_id = job.get('job_id')
        list_id = job.get('list_id')
        
        if not job_id or not list_id:
            logger.error(f"Invalid job data: {job}")
            self._update_job_status(job_id, 'error', 'Invalid job data')
            return
        
        try:
            self._update_job_status(job_id, 'processing')
            
            records = self._fetch_list_records(list_id)
            
            if not records:
                logger.warning(f"No records found for list_id: {list_id}")
                self._update_job_status(job_id, 'completed', 'No records to process')
                return
            
            processed_records = self._process_records(records)
            
            self._store_results(job_id, list_id, processed_records)
            
            self._update_job_status(job_id, 'completed')
            
            logger.info(f"Job {job_id} completed successfully")
            
        except Exception as e:
            logger.error(f"Error processing job {job_id}: {str(e)}")
            self._update_job_status(job_id, 'error', str(e))
    
    def _fetch_list_records(self, list_id: str) -> List[Dict[str, Any]]:
        """
        Fetch records from the database for a given list.
        
        Args:
            list_id: ID of the list to fetch records for
            
        Returns:
            List of records
        """
        cursor = self.db.cursor()
        cursor.execute(
            "SELECT * FROM list_entries WHERE list_id = %s",
            (list_id,)
        )
        records = cursor.fetchall()
        cursor.close()
        return records
    
    def _process_records(self, records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Process records with enrichment logic.
        
        Args:
            records: List of records to process
            
        Returns:
            List of processed records with enrichment data
        """
        processed_records = []
        
        for record in records:
            first_name = record.get('first_name', '')
            last_name = record.get('last_name', '')
            
            rpc_score = calculate_rpc_score(
                f"{first_name} {last_name}",
                f"{record.get('target_first_name', '')} {record.get('target_last_name', '')}"
            )
            
            enriched_record = {
                **record,
                'rpc_score': rpc_score,
                'processed_at': time.time()
            }
            
            processed_records.append(enriched_record)
            
        return processed_records
    
    def _store_results(self, job_id: str, list_id: str, records: List[Dict[str, Any]]):
        """
        Store processed records in the database.
        
        Args:
            job_id: ID of the job
            list_id: ID of the list
            records: List of processed records
        """
        cursor = self.db.cursor()
        
        try:
            cursor.execute("BEGIN")
            
            for record in records:
                cursor.execute(
                    """
                    INSERT INTO rpc_scores (
                        entry_id, job_id, score, processed_at
                    ) VALUES (%s, %s, %s, %s)
                    """,
                    (
                        record.get('id'),
                        job_id,
                        record.get('rpc_score'),
                        record.get('processed_at')
                    )
                )
                
                cursor.execute(
                    """
                    UPDATE list_entries
                    SET enriched = TRUE, last_enriched_at = %s
                    WHERE id = %s
                    """,
                    (record.get('processed_at'), record.get('id'))
                )
            
            cursor.execute(
                """
                INSERT INTO export_jobs (
                    job_id, list_id, record_count, status
                ) VALUES (%s, %s, %s, %s)
                """,
                (job_id, list_id, len(records), 'completed')
            )
            
            cursor.execute("COMMIT")
            
        except Exception as e:
            cursor.execute("ROLLBACK")
            raise e
        finally:
            cursor.close()
    
    def _update_job_status(self, job_id: str, status: str, message: Optional[str] = None):
        """
        Update job status in the database.
        
        Args:
            job_id: ID of the job
            status: New status (processing, completed, error)
            message: Optional status message
        """
        cursor = self.db.cursor()
        
        try:
            cursor.execute(
                """
                UPDATE enrichment_queue_jobs
                SET status = %s, message = %s, updated_at = NOW()
                WHERE job_id = %s
                """,
                (status, message, job_id)
            )
            self.db.commit()
        except Exception as e:
            logger.error(f"Error updating job status: {str(e)}")
        finally:
            cursor.close()


def main():
    """Main entry point for the worker."""
    worker = EnrichmentWorker()
    worker.start()


if __name__ == "__main__":
    main()
