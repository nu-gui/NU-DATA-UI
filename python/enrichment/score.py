"""
Scoring module for the NU-DATA-UI enrichment service.
Implements RPC/WPC name scoring using fuzzy matching algorithms.
"""
import logging
from typing import Dict, Any, Tuple, List, Optional

try:
    from rapidfuzz import fuzz
    from rapidfuzz.utils import default_process
    USE_RAPIDFUZZ = True
except ImportError:
    import difflib
    USE_RAPIDFUZZ = False

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

SCORE_THRESHOLDS = {
    'exact': 1.0,
    'high': 0.9,
    'medium': 0.75,
    'low': 0.6,
    'poor': 0.4
}


def calculate_rpc_score(name1: str, name2: str) -> float:
    """
    Calculate RPC (Real Person Confirmation) score between two names.
    
    Args:
        name1: First name to compare
        name2: Second name to compare
        
    Returns:
        Score between 0 and 1, where 1 is an exact match
    """
    if not name1 and not name2:
        return 1.0
    if not name1 or not name2:
        return 0.0
    
    name1 = name1.lower().strip()
    name2 = name2.lower().strip()
    
    if name1 == name2:
        return 1.0
    
    if USE_RAPIDFUZZ:
        score = fuzz.ratio(name1, name2) / 100.0
    else:
        score = difflib.SequenceMatcher(None, name1, name2).ratio()
    
    return score


def get_score_category(score: float) -> str:
    """
    Get the category for a given score.
    
    Args:
        score: Score between 0 and 1
        
    Returns:
        Category string: 'exact', 'high', 'medium', 'low', 'poor', or 'no_match'
    """
    if score >= SCORE_THRESHOLDS['exact']:
        return 'exact'
    elif score >= SCORE_THRESHOLDS['high']:
        return 'high'
    elif score >= SCORE_THRESHOLDS['medium']:
        return 'medium'
    elif score >= SCORE_THRESHOLDS['low']:
        return 'low'
    elif score >= SCORE_THRESHOLDS['poor']:
        return 'poor'
    else:
        return 'no_match'


def calculate_name_components_score(
    first_name1: str,
    last_name1: str,
    first_name2: str,
    last_name2: str
) -> Dict[str, Any]:
    """
    Calculate detailed scoring for name components.
    
    Args:
        first_name1: First name of the first person
        last_name1: Last name of the first person
        first_name2: First name of the second person
        last_name2: Last name of the second person
        
    Returns:
        Dictionary with component scores and overall score
    """
    first_name_score = calculate_rpc_score(first_name1, first_name2)
    last_name_score = calculate_rpc_score(last_name1, last_name2)
    
    full_name1 = f"{first_name1} {last_name1}"
    full_name2 = f"{first_name2} {last_name2}"
    reversed_name2 = f"{last_name2} {first_name2}"
    
    full_name_score = calculate_rpc_score(full_name1, full_name2)
    reversed_name_score = calculate_rpc_score(full_name1, reversed_name2)
    
    best_full_score = max(full_name_score, reversed_name_score)
    
    overall_score = (
        (best_full_score * 0.6) +
        (first_name_score * 0.2) +
        (last_name_score * 0.2)
    )
    
    return {
        'first_name_score': first_name_score,
        'last_name_score': last_name_score,
        'full_name_score': best_full_score,
        'overall_score': overall_score,
        'category': get_score_category(overall_score)
    }


def batch_score_names(
    names: List[Tuple[str, str, str, str]]
) -> List[Dict[str, Any]]:
    """
    Score a batch of name pairs.
    
    Args:
        names: List of tuples (first_name1, last_name1, first_name2, last_name2)
        
    Returns:
        List of scoring results
    """
    results = []
    
    for first_name1, last_name1, first_name2, last_name2 in names:
        score_result = calculate_name_components_score(
            first_name1, last_name1, first_name2, last_name2
        )
        results.append(score_result)
    
    return results


if __name__ == "__main__":
    score = calculate_rpc_score("John Smith", "Jon Smith")
    print(f"Score: {score}, Category: {get_score_category(score)}")
    
    detailed_score = calculate_name_components_score(
        "John", "Smith", "Jon", "Smith"
    )
    print(f"Detailed score: {detailed_score}")
