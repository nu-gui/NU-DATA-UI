"""
Configuration module for the NU-DATA-UI enrichment service.
Loads configuration from environment variables or .env file.
"""
import logging
import os
from typing import Dict, Any

try:
    from dotenv import load_dotenv
    DOTENV_AVAILABLE = True
except ImportError:
    DOTENV_AVAILABLE = False

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

DEFAULT_CONFIG = {
    'DB_HOST': 'localhost',
    'DB_PORT': '5432',
    'DB_NAME': 'nu_data',
    'DB_USER': 'postgres',
    'DB_PASSWORD': 'postgres',
    
    'REDIS_HOST': 'localhost',
    'REDIS_PORT': '6379',
    'REDIS_DB': '0',
    'REDIS_PASSWORD': '',
    
    'WORKER_THREADS': '4',
    'JOB_TIMEOUT': '300',  # 5 minutes
    'MAX_RETRIES': '3',
    
    'LOG_LEVEL': 'INFO',
    
    'APP_ENV': 'development',
}


def load_env_file(env_file: str = '.env') -> bool:
    """
    Load environment variables from .env file.
    
    Args:
        env_file: Path to .env file
        
    Returns:
        True if successful, False otherwise
    """
    if not DOTENV_AVAILABLE:
        logger.warning("python-dotenv not installed, skipping .env file loading")
        return False
    
    if not os.path.exists(env_file):
        logger.warning(f".env file not found at {env_file}")
        return False
    
    try:
        load_dotenv(env_file)
        logger.info(f"Loaded environment variables from {env_file}")
        return True
    except Exception as e:
        logger.error(f"Error loading .env file: {str(e)}")
        return False


def get_config() -> Dict[str, Any]:
    """
    Get configuration from environment variables or defaults.
    
    Returns:
        Dictionary with configuration values
    """
    load_env_file()
    
    config = {}
    
    for key, default_value in DEFAULT_CONFIG.items():
        config[key] = os.environ.get(key, default_value)
    
    log_level = config.get('LOG_LEVEL', 'INFO')
    logging.getLogger().setLevel(log_level)
    
    logger.debug(f"Configuration loaded: {config}")
    return config


def get_env() -> str:
    """
    Get the current environment.
    
    Returns:
        Environment name (development, testing, production)
    """
    return os.environ.get('APP_ENV', 'development')


def is_production() -> bool:
    """
    Check if running in production environment.
    
    Returns:
        True if in production, False otherwise
    """
    return get_env() == 'production'


def is_testing() -> bool:
    """
    Check if running in testing environment.
    
    Returns:
        True if in testing, False otherwise
    """
    return get_env() == 'testing'


if __name__ == "__main__":
    config = get_config()
    for key, value in config.items():
        if 'PASSWORD' in key or 'SECRET' in key:
            value = '********'
        print(f"{key}: {value}")
