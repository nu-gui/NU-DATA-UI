"""
Database connection module for the NU-DATA-UI enrichment service.
Provides PostgreSQL connection handling.
"""
import logging
import os
from typing import Any, Dict, Optional

import psycopg2
from psycopg2.extras import RealDictCursor

from .config import get_config

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def get_db_connection():
    """
    Create a connection to the PostgreSQL database.
    
    Returns:
        Database connection object
    """
    config = get_config()
    
    try:
        connection = psycopg2.connect(
            host=config.get('DB_HOST', 'localhost'),
            port=config.get('DB_PORT', 5432),
            database=config.get('DB_NAME', 'nu_data'),
            user=config.get('DB_USER', 'postgres'),
            password=config.get('DB_PASSWORD', 'postgres'),
            cursor_factory=RealDictCursor
        )
        logger.info("Database connection established")
        return connection
    except Exception as e:
        logger.error(f"Database connection error: {str(e)}")
        raise


def close_db_connection(connection):
    """
    Close a database connection.
    
    Args:
        connection: Database connection to close
    """
    if connection:
        connection.close()
        logger.info("Database connection closed")


def execute_query(query: str, params: Optional[tuple] = None) -> Dict[str, Any]:
    """
    Execute a database query and return the results.
    
    Args:
        query: SQL query to execute
        params: Query parameters
        
    Returns:
        Dictionary with query results
    """
    connection = None
    cursor = None
    result = {
        'success': False,
        'data': None,
        'error': None
    }
    
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        cursor.execute(query, params)
        
        if query.strip().upper().startswith('SELECT'):
            result['data'] = cursor.fetchall()
        else:
            connection.commit()
            result['data'] = {
                'rowcount': cursor.rowcount
            }
        
        result['success'] = True
        
    except Exception as e:
        logger.error(f"Query execution error: {str(e)}")
        result['error'] = str(e)
        
        if connection:
            connection.rollback()
            
    finally:
        if cursor:
            cursor.close()
        if connection:
            close_db_connection(connection)
            
    return result


def get_list_entries(list_id: str) -> Dict[str, Any]:
    """
    Get entries for a specific list.
    
    Args:
        list_id: ID of the list to fetch entries for
        
    Returns:
        Dictionary with query results
    """
    query = """
    SELECT * FROM list_entries
    WHERE list_id = %s
    """
    return execute_query(query, (list_id,))


def update_entry_enrichment(entry_id: str, rpc_score: float) -> Dict[str, Any]:
    """
    Update a list entry with enrichment data.
    
    Args:
        entry_id: ID of the entry to update
        rpc_score: RPC score to set
        
    Returns:
        Dictionary with query results
    """
    query = """
    UPDATE list_entries
    SET enriched = TRUE, 
        rpc_score = %s,
        last_enriched_at = NOW()
    WHERE id = %s
    """
    return execute_query(query, (rpc_score, entry_id))


def create_rpc_score_record(
    entry_id: str,
    job_id: str,
    score: float
) -> Dict[str, Any]:
    """
    Create a record in the rpc_scores table.
    
    Args:
        entry_id: ID of the list entry
        job_id: ID of the enrichment job
        score: RPC score
        
    Returns:
        Dictionary with query results
    """
    query = """
    INSERT INTO rpc_scores (entry_id, job_id, score, created_at)
    VALUES (%s, %s, %s, NOW())
    RETURNING id
    """
    return execute_query(query, (entry_id, job_id, score))


def update_job_status(
    job_id: str,
    status: str,
    message: Optional[str] = None
) -> Dict[str, Any]:
    """
    Update the status of an enrichment job.
    
    Args:
        job_id: ID of the job to update
        status: New status
        message: Optional status message
        
    Returns:
        Dictionary with query results
    """
    query = """
    UPDATE enrichment_queue_jobs
    SET status = %s, 
        message = %s,
        updated_at = NOW()
    WHERE job_id = %s
    """
    return execute_query(query, (status, message, job_id))
