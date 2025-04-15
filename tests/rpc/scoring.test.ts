import { calculateRPCScore } from '../../src/services/scoring/rpcScoring';

describe('RPC Scoring Tests', () => {
  test('should return high score for exact matches', () => {
    const result = calculateRPCScore('John Smith', 'John Smith');
    expect(result).toBeGreaterThanOrEqual(0.95);
  });

  test('should return medium score for similar names', () => {
    const result = calculateRPCScore('John Smith', 'Jon Smith');
    expect(result).toBeGreaterThanOrEqual(0.8);
    expect(result).toBeLessThan(0.95);
  });

  test('should return low score for different names', () => {
    const result = calculateRPCScore('John Smith', 'Jane Doe');
    expect(result).toBeLessThan(0.5);
  });

  test('should handle case insensitivity', () => {
    const result1 = calculateRPCScore('john smith', 'JOHN SMITH');
    const result2 = calculateRPCScore('John Smith', 'john smith');
    
    expect(result1).toBeGreaterThanOrEqual(0.95);
    expect(result2).toBeGreaterThanOrEqual(0.95);
  });

  test('should handle name parts in different order', () => {
    const result = calculateRPCScore('John Smith', 'Smith, John');
    expect(result).toBeGreaterThanOrEqual(0.9);
  });

  test('should handle empty strings', () => {
    const result1 = calculateRPCScore('', 'John Smith');
    const result2 = calculateRPCScore('John Smith', '');
    const result3 = calculateRPCScore('', '');
    
    expect(result1).toBe(0);
    expect(result2).toBe(0);
    expect(result3).toBe(1); // Empty strings are identical
  });
});
