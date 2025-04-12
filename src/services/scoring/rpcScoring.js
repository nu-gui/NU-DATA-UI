/**
 * RPC/WPC Scoring Engine
 * 
 * Implements fuzzy name matching and scoring for contact records
 * to determine Right Party Contact (RPC) and Wrong Party Contact (WPC) scores.
 */

const { StringSimilarity } = require('string-similarity-js');
const stringSimilarity = new StringSimilarity();

/**
 * Confidence level thresholds for match scoring
 */
const CONFIDENCE_LEVELS = {
  HIGH: { min: 0.8, max: 1.0, label: 'high' },
  MEDIUM: { min: 0.5, max: 0.79, label: 'medium' },
  LOW: { min: 0.0, max: 0.49, label: 'low' },
  NONE: { min: 0.0, max: 0.0, label: 'none' }
};

/**
 * Weights for different name components in the scoring algorithm
 */
const COMPONENT_WEIGHTS = {
  FIRST_NAME: 0.4,
  MIDDLE_NAME: 0.2,
  LAST_NAME: 0.4
};

/**
 * Calculate fuzzy match score between two strings
 * @param {string} source - Source string
 * @param {string} target - Target string to compare against
 * @returns {number} Similarity score between 0 and 1
 */
function calculateFuzzyMatchScore(source, target) {
  if (!source || !target) {
    return 0;
  }
  
  const normalizedSource = source.toLowerCase().trim();
  const normalizedTarget = target.toLowerCase().trim();
  
  if (normalizedSource === normalizedTarget) {
    return 1.0;
  }
  
  const { calculatePrefixMatchScore } = require('./nameMatching');
  const prefixScore = calculatePrefixMatchScore(normalizedSource, normalizedTarget, 3);
  
  const similarityScore = stringSimilarity.jaroWinklerSimilarity(normalizedSource, normalizedTarget);
  
  const boostedScore = prefixScore >= 1 
    ? similarityScore * 1.2 // Boost by 20% if all prefix letters match
    : prefixScore >= 0.67 
      ? similarityScore * 1.1 // Boost by 10% if 2/3 prefix letters match
      : similarityScore;
  
  return Math.min(boostedScore, 1.0);
}

/**
 * Extract name components from a full name
 * @param {string} fullName - Full name to parse
 * @returns {Object} Object containing first, middle, and last name components
 */
function extractNameComponents(fullName) {
  if (!fullName) {
    return { firstName: '', middleName: '', lastName: '' };
  }
  
  const nameParts = fullName.trim().split(/\s+/);
  
  if (nameParts.length === 1) {
    return { firstName: nameParts[0], middleName: '', lastName: '' };
  } else if (nameParts.length === 2) {
    return { firstName: nameParts[0], middleName: '', lastName: nameParts[1] };
  } else {
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const middleName = nameParts.slice(1, nameParts.length - 1).join(' ');
    
    return { firstName, middleName, lastName };
  }
}

/**
 * Calculate RPC score based on name component matching
 * @param {Object} sourceNameComponents - Source name components
 * @param {Object} targetNameComponents - Target name components
 * @returns {Object} RPC score details including overall score and component scores
 */
function calculateRPCScore(sourceNameComponents, targetNameComponents) {
  const firstNameScore = calculateFuzzyMatchScore(
    sourceNameComponents.firstName,
    targetNameComponents.firstName
  );
  
  const middleNameScore = calculateFuzzyMatchScore(
    sourceNameComponents.middleName,
    targetNameComponents.middleName
  );
  
  const lastNameScore = calculateFuzzyMatchScore(
    sourceNameComponents.lastName,
    targetNameComponents.lastName
  );
  
  const hasFirstNameExactMatch = firstNameScore >= 0.95 && sourceNameComponents.firstName;
  const hasLastNameExactMatch = lastNameScore >= 0.95 && sourceNameComponents.lastName;
  
  let weightedScore = 
    (firstNameScore * COMPONENT_WEIGHTS.FIRST_NAME) +
    (middleNameScore * COMPONENT_WEIGHTS.MIDDLE_NAME) +
    (lastNameScore * COMPONENT_WEIGHTS.LAST_NAME);
  
  if ((hasFirstNameExactMatch || hasLastNameExactMatch) && weightedScore >= 0.3) {
    weightedScore = Math.min(weightedScore * 1.15, 1.0); // Boost by 15% if any name fully matches
  }
  
  let confidenceLevel = CONFIDENCE_LEVELS.NONE.label;
  
  if (weightedScore >= CONFIDENCE_LEVELS.HIGH.min) {
    confidenceLevel = CONFIDENCE_LEVELS.HIGH.label;
  } else if (weightedScore >= CONFIDENCE_LEVELS.MEDIUM.min) {
    confidenceLevel = CONFIDENCE_LEVELS.MEDIUM.label;
  } else if (weightedScore > 0) {
    const { calculatePrefixMatchScore } = require('./nameMatching');
    const firstNamePrefix = calculatePrefixMatchScore(
      sourceNameComponents.firstName || '',
      targetNameComponents.firstName || '',
      3
    );
    const lastNamePrefix = calculatePrefixMatchScore(
      sourceNameComponents.lastName || '',
      targetNameComponents.lastName || '',
      3
    );
    
    if ((firstNamePrefix >= 0.67 || lastNamePrefix >= 0.67) && weightedScore >= 0.3) {
      weightedScore = Math.max(weightedScore, 0.5); // Ensure at least medium match for good prefix
      confidenceLevel = CONFIDENCE_LEVELS.MEDIUM.label;
    } else {
      confidenceLevel = CONFIDENCE_LEVELS.LOW.label;
    }
  }
  
  return {
    rpcScore: parseFloat(weightedScore.toFixed(2)),
    matchType: confidenceLevel,
    matchBreakdown: {
      firstName: parseFloat(firstNameScore.toFixed(2)),
      middleName: parseFloat(middleNameScore.toFixed(2)),
      lastName: parseFloat(lastNameScore.toFixed(2)),
      hasExactMatch: hasFirstNameExactMatch || hasLastNameExactMatch
    }
  };
}

/**
 * Calculate WPC score (inverse of RPC score)
 * @param {number} rpcScore - RPC score
 * @returns {number} WPC score
 */
function calculateWPCScore(rpcScore) {
  return parseFloat((1 - rpcScore).toFixed(2));
}

/**
 * Determine if phone number prioritization should change based on scores
 * @param {number} rpcScore - RPC score
 * @param {number} wpcScore - WPC score
 * @returns {boolean} Whether priority should change
 */
function shouldChangePriority(rpcScore, wpcScore) {
  return wpcScore >= CONFIDENCE_LEVELS.HIGH.min && rpcScore <= CONFIDENCE_LEVELS.LOW.max;
}

/**
 * Process a contact record against lookup data to generate RPC/WPC scores
 * @param {Object} sourceContact - Source contact record
 * @param {Object} lookupResult - Lookup result data
 * @returns {Object} Scoring results
 */
function processContactScoring(sourceContact, lookupResult) {
  const sourceName = `${sourceContact.first_name || ''} ${sourceContact.middle_name || ''} ${sourceContact.last_name || ''}`.trim();
  const sourceNameComponents = {
    firstName: sourceContact.first_name || '',
    middleName: sourceContact.middle_name || '',
    lastName: sourceContact.last_name || ''
  };
  
  const lookupName = lookupResult.name || '';
  const lookupNameComponents = extractNameComponents(lookupName);
  
  const rpcScoreResult = calculateRPCScore(sourceNameComponents, lookupNameComponents);
  
  const wpcScore = calculateWPCScore(rpcScoreResult.rpcScore);
  
  const priorityChange = shouldChangePriority(rpcScoreResult.rpcScore, wpcScore);
  
  return {
    entryId: sourceContact.id,
    matchType: rpcScoreResult.matchType,
    rpcScore: rpcScoreResult.rpcScore,
    wpcScore: wpcScore,
    sourceName: sourceName,
    matchedName: lookupName,
    matchBreakdown: rpcScoreResult.matchBreakdown,
    priorityChange: priorityChange
  };
}

module.exports = {
  processContactScoring,
  calculateRPCScore,
  calculateWPCScore,
  extractNameComponents,
  calculateFuzzyMatchScore,
  CONFIDENCE_LEVELS,
  COMPONENT_WEIGHTS
};
