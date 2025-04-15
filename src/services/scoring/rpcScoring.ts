/**
 * Calculates the RPC (Real Person Confirmation) score between two names
 * Higher score indicates higher likelihood of being the same person
 * 
 * @param name1 First name to compare
 * @param name2 Second name to compare
 * @returns Score between 0 and 1
 */
export const calculateRPCScore = (name1: string, name2: string): number => {
  if (name1 === '' && name2 === '') return 1;
  if (name1 === '' || name2 === '') return 0;
  
  const normalizedName1 = name1.toLowerCase().trim();
  const normalizedName2 = name2.toLowerCase().trim();
  
  if (normalizedName1 === normalizedName2) {
    return 1;
  }
  
  const parts1 = normalizedName1.split(/[\s,]+/).filter(part => part.length > 0);
  const parts2 = normalizedName2.split(/[\s,]+/).filter(part => part.length > 0);
  
  if (parts1.length === parts2.length && parts1.every(part => parts2.includes(part))) {
    return 0.95;
  }
  
  const maxLength = Math.max(normalizedName1.length, normalizedName2.length);
  if (maxLength === 0) return 1;
  
  const distance = levenshteinDistance(normalizedName1, normalizedName2);
  const similarity = 1 - distance / maxLength;
  
  return similarity;
};

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  return dp[m][n];
}
