/**
 * Name Matching Engine
 * 
 * Implements fuzzy name matching algorithms for contact data enrichment.
 * Supports various matching strategies and nickname handling.
 */

const { StringSimilarity } = require('string-similarity-js');
const stringSimilarity = new StringSimilarity();

const NICKNAME_MAPPINGS = {
  'william': ['will', 'bill', 'billy', 'willy'],
  'robert': ['rob', 'bob', 'bobby'],
  'richard': ['rick', 'dick', 'richie'],
  'michael': ['mike', 'mikey', 'mick'],
  'james': ['jim', 'jimmy', 'jamie'],
  'joseph': ['joe', 'joey', 'jos'],
  'thomas': ['tom', 'tommy'],
  'charles': ['chuck', 'charlie', 'chas'],
  'christopher': ['chris', 'topher'],
  'daniel': ['dan', 'danny'],
  'matthew': ['matt', 'matty'],
  'anthony': ['tony', 'ant'],
  'donald': ['don', 'donny'],
  'steven': ['steve', 'stevie'],
  'edward': ['ed', 'eddie', 'ted'],
  'joshua': ['josh', 'joshie'],
  'david': ['dave', 'davey'],
  'elizabeth': ['liz', 'beth', 'eliza', 'betty', 'lizzie'],
  'margaret': ['maggie', 'meg', 'peggy'],
  'katherine': ['kate', 'katie', 'kathy'],
  'jennifer': ['jen', 'jenny'],
  'patricia': ['pat', 'patty', 'tricia'],
  'deborah': ['deb', 'debbie'],
  'susan': ['sue', 'susie'],
  'barbara': ['barb', 'barbie'],
  'jessica': ['jess', 'jessie'],
  'sarah': ['sara', 'sally'],
  'cynthia': ['cindy'],
  'victoria': ['vicky', 'tori'],
  'rebecca': ['becky', 'becca']
};

/**
 * Get all possible nickname variations for a given name
 * @param {string} name - Name to find variations for
 * @returns {Array} Array of possible name variations
 */
function getNicknameVariations(name) {
  if (!name) return [];
  
  const normalizedName = name.toLowerCase().trim();
  
  for (const [fullName, nicknames] of Object.entries(NICKNAME_MAPPINGS)) {
    if (fullName === normalizedName) {
      return nicknames;
    }
    
    if (nicknames.includes(normalizedName)) {
      return [fullName, ...nicknames.filter(n => n !== normalizedName)];
    }
  }
  
  return [];
}

/**
 * Calculate sequential prefix match score
 * @param {string} source - Source string
 * @param {string} target - Target string
 * @param {number} prefixLength - Length of prefix to check (default: 3)
 * @returns {number} Score between 0 and 1
 */
function calculatePrefixMatchScore(source, target, prefixLength = 3) {
  if (!source || !target) return 0;
  
  const sourcePrefix = source.substring(0, Math.min(prefixLength, source.length));
  const targetPrefix = target.substring(0, Math.min(prefixLength, target.length));
  
  let matchCount = 0;
  const minLength = Math.min(sourcePrefix.length, targetPrefix.length);
  
  for (let i = 0; i < minLength; i++) {
    if (sourcePrefix[i] === targetPrefix[i]) {
      matchCount++;
    } else {
      break; // Stop at first non-matching character to enforce sequential matching
    }
  }
  
  return matchCount / prefixLength;
}

/**
 * Match names with nickname awareness and sequential letter matching
 * @param {string} sourceName - Source name
 * @param {string} targetName - Target name to compare against
 * @returns {Object} Match result with score and match type
 */
function matchNamesWithNicknames(sourceName, targetName) {
  if (!sourceName || !targetName) {
    return { score: 0, matchType: 'none' };
  }
  
  const normalizedSource = sourceName.toLowerCase().trim();
  const normalizedTarget = targetName.toLowerCase().trim();
  
  if (normalizedSource === normalizedTarget) {
    return { score: 1.0, matchType: 'exact' };
  }
  
  const sourceVariations = [normalizedSource, ...getNicknameVariations(normalizedSource)];
  const targetVariations = [normalizedTarget, ...getNicknameVariations(normalizedTarget)];
  
  for (const sourceVar of sourceVariations) {
    for (const targetVar of targetVariations) {
      if (sourceVar === targetVar) {
        return { score: 0.95, matchType: 'nickname' };
      }
    }
  }
  
  let bestScore = 0;
  let prefixScore = 0;
  
  for (const sourceVar of sourceVariations) {
    for (const targetVar of targetVariations) {
      const currentPrefixScore = calculatePrefixMatchScore(sourceVar, targetVar, 3);
      prefixScore = Math.max(prefixScore, currentPrefixScore);
      
      const similarityScore = stringSimilarity.jaroWinklerSimilarity(sourceVar, targetVar);
      
      const boostedScore = currentPrefixScore >= 1 
        ? similarityScore * 1.2 // Boost by 20% if all prefix letters match
        : currentPrefixScore >= 0.67 
          ? similarityScore * 1.1 // Boost by 10% if 2/3 prefix letters match
          : similarityScore;
      
      if (boostedScore > bestScore) {
        bestScore = boostedScore;
      }
    }
  }
  
  bestScore = Math.min(bestScore, 1.0);
  
  let matchType = 'none';
  if (bestScore >= 0.8) {
    matchType = 'high';
  } else if (bestScore >= 0.5) {
    matchType = 'medium';
  } else if (bestScore > 0) {
    if (prefixScore >= 0.67 && bestScore >= 0.3) {
      bestScore = Math.max(bestScore, 0.5); // Ensure at least medium match for good prefix
      matchType = 'medium';
    } else {
      matchType = 'low';
    }
  }
  
  return { 
    score: parseFloat(bestScore.toFixed(2)), 
    matchType,
    prefixScore: parseFloat(prefixScore.toFixed(2))
  };
}

/**
 * Handle swapped name components (first/last name swapped)
 * @param {Object} sourceComponents - Source name components
 * @param {Object} targetComponents - Target name components
 * @returns {Object} Best match result
 */
function handleSwappedNames(sourceComponents, targetComponents) {
  const normalMatch = {
    firstName: matchNamesWithNicknames(
      sourceComponents.firstName, 
      targetComponents.firstName
    ),
    lastName: matchNamesWithNicknames(
      sourceComponents.lastName,
      targetComponents.lastName
    )
  };
  
  const swappedMatch = {
    firstName: matchNamesWithNicknames(
      sourceComponents.firstName,
      targetComponents.lastName
    ),
    lastName: matchNamesWithNicknames(
      sourceComponents.lastName,
      targetComponents.firstName
    )
  };
  
  let normalScore = 0;
  let componentCount = 0;
  
  const hasFullMatch = normalMatch.firstName.score >= 0.95 || normalMatch.lastName.score >= 0.95;
  
  if (sourceComponents.firstName) {
    normalScore += normalMatch.firstName.score;
    componentCount++;
  }
  
  if (sourceComponents.lastName) {
    normalScore += normalMatch.lastName.score;
    componentCount++;
  }
  
  normalScore = componentCount > 0 ? normalScore / componentCount : 0;
  
  if (hasFullMatch && normalScore >= 0.3) {
    normalScore = Math.min(normalScore * 1.15, 1.0); // Boost by 15% if any component is full match
  }
  
  let swappedScore = 0;
  let swappedComponentCount = 0;
  
  const hasSwappedFullMatch = swappedMatch.firstName.score >= 0.95 || swappedMatch.lastName.score >= 0.95;
  
  if (sourceComponents.firstName) {
    swappedScore += swappedMatch.firstName.score;
    swappedComponentCount++;
  }
  
  if (sourceComponents.lastName) {
    swappedScore += swappedMatch.lastName.score;
    swappedComponentCount++;
  }
  
  swappedScore = swappedComponentCount > 0 ? swappedScore / swappedComponentCount : 0;
  
  if (hasSwappedFullMatch && swappedScore >= 0.3) {
    swappedScore = Math.min(swappedScore * 1.15, 1.0); // Boost by 15% if any component is full match
  }
  
  if (swappedScore > normalScore && swappedScore >= 0.7) {
    return {
      score: swappedScore,
      matchType: 'swapped',
      components: swappedMatch,
      isSwapped: true,
      hasFullMatch: hasSwappedFullMatch
    };
  }
  
  return {
    score: normalScore,
    matchType: normalScore >= 0.8 ? 'high' : (normalScore >= 0.5 ? 'medium' : 'low'),
    components: normalMatch,
    isSwapped: false,
    hasFullMatch
  };
}

/**
 * Match full names with component-level analysis
 * @param {string} sourceName - Source full name
 * @param {string} targetName - Target full name
 * @returns {Object} Detailed match result
 */
function matchFullNames(sourceName, targetName) {
  if (!sourceName || !targetName) {
    return {
      score: 0,
      matchType: 'none',
      components: {},
      isSwapped: false
    };
  }
  
  const sourceComponents = extractNameComponents(sourceName);
  const targetComponents = extractNameComponents(targetName);
  
  return handleSwappedNames(sourceComponents, targetComponents);
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

module.exports = {
  matchNamesWithNicknames,
  matchFullNames,
  getNicknameVariations,
  extractNameComponents,
  calculatePrefixMatchScore,
  NICKNAME_MAPPINGS
};
