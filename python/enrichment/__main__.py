"""
Main entry point for the NU-DATA-UI enrichment service.
"""
import argparse
import logging
import sys

from .worker import EnrichmentWorker

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description='NU-DATA-UI Enrichment Service'
    )
    
    parser.add_argument(
        '--env-file',
        help='Path to .env file',
        default='.env'
    )
    
    parser.add_argument(
        '--log-level',
        help='Logging level',
        choices=['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'],
        default='INFO'
    )
    
    return parser.parse_args()


def main():
    """Main entry point."""
    args = parse_args()
    
    logging.getLogger().setLevel(args.log_level)
    
    try:
        worker = EnrichmentWorker()
        worker.start()
    except KeyboardInterrupt:
        logger.info("Service stopped by user")
    except Exception as e:
        logger.error(f"Service error: {str(e)}")
        return 1
    
    return 0


if __name__ == "__main__":
    sys.exit(main())
