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
 * Match names with nickname awareness
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
  
  for (const sourceVar of sourceVariations) {
    for (const targetVar of targetVariations) {
      const score = stringSimilarity.jaroWinklerSimilarity(sourceVar, targetVar);
      if (score > bestScore) {
        bestScore = score;
      }
    }
  }
  
  let matchType = 'none';
  if (bestScore >= 0.8) {
    matchType = 'high';
  } else if (bestScore >= 0.5) {
    matchType = 'medium';
  } else if (bestScore > 0) {
    matchType = 'low';
  }
  
  return { 
    score: parseFloat(bestScore.toFixed(2)), 
    matchType 
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
  
  const normalScore = (normalMatch.firstName.score + normalMatch.lastName.score) / 2;
  const swappedScore = (swappedMatch.firstName.score + swappedMatch.lastName.score) / 2;
  
  if (swappedScore > normalScore && swappedScore >= 0.7) {
    return {
      score: swappedScore,
      matchType: 'swapped',
      components: swappedMatch,
      isSwapped: true
    };
  }
  
  return {
    score: normalScore,
    matchType: normalScore >= 0.8 ? 'high' : (normalScore >= 0.5 ? 'medium' : 'low'),
    components: normalMatch,
    isSwapped: false
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
  NICKNAME_MAPPINGS
};
