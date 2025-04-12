/**
 * RPC Scoring Service Tests
 */

const {
  processContactScoring,
  calculateRPCScore,
  calculateWPCScore,
  extractNameComponents,
  calculateFuzzyMatchScore,
  CONFIDENCE_LEVELS,
  COMPONENT_WEIGHTS
} = require('../../../src/services/scoring/rpcScoring');

describe('RPC Scoring Service', () => {
  describe('calculateFuzzyMatchScore', () => {
    test('should return 1 for identical strings', () => {
      expect(calculateFuzzyMatchScore('John', 'John')).toBe(1);
    });
    
    test('should return 0 for empty strings', () => {
      expect(calculateFuzzyMatchScore('', '')).toBe(0);
      expect(calculateFuzzyMatchScore(null, 'John')).toBe(0);
      expect(calculateFuzzyMatchScore('John', null)).toBe(0);
    });
    
    test('should handle case insensitivity', () => {
      expect(calculateFuzzyMatchScore('john', 'JOHN')).toBe(1);
    });
    
    test('should handle whitespace', () => {
      expect(calculateFuzzyMatchScore('  John  ', 'John')).toBe(1);
    });
    
    test('should return partial scores for similar strings', () => {
      const score = calculateFuzzyMatchScore('John', 'Jon');
      expect(score).toBeGreaterThan(0.8);
      expect(score).toBeLessThan(1);
    });
  });
  
  describe('extractNameComponents', () => {
    test('should extract first, middle, and last names', () => {
      const result = extractNameComponents('John William Smith');
      expect(result).toEqual({
        firstName: 'John',
        middleName: 'William',
        lastName: 'Smith'
      });
    });
    
    test('should handle first and last name only', () => {
      const result = extractNameComponents('John Smith');
      expect(result).toEqual({
        firstName: 'John',
        middleName: '',
        lastName: 'Smith'
      });
    });
    
    test('should handle single name', () => {
      const result = extractNameComponents('John');
      expect(result).toEqual({
        firstName: 'John',
        middleName: '',
        lastName: ''
      });
    });
    
    test('should handle empty input', () => {
      const result = extractNameComponents('');
      expect(result).toEqual({
        firstName: '',
        middleName: '',
        lastName: ''
      });
    });
    
    test('should handle multiple middle names', () => {
      const result = extractNameComponents('John William Robert Smith');
      expect(result).toEqual({
        firstName: 'John',
        middleName: 'William Robert',
        lastName: 'Smith'
      });
    });
  });
  
  describe('calculateRPCScore', () => {
    test('should calculate perfect match score', () => {
      const source = { firstName: 'John', middleName: 'William', lastName: 'Smith' };
      const target = { firstName: 'John', middleName: 'William', lastName: 'Smith' };
      
      const result = calculateRPCScore(source, target);
      
      expect(result.rpcScore).toBe(1);
      expect(result.matchType).toBe('high');
      expect(result.matchBreakdown).toEqual({
        firstName: 1,
        middleName: 1,
        lastName: 1
      });
    });
    
    test('should calculate high match score', () => {
      const source = { firstName: 'John', middleName: 'William', lastName: 'Smith' };
      const target = { firstName: 'Jon', middleName: 'Will', lastName: 'Smith' };
      
      const result = calculateRPCScore(source, target);
      
      expect(result.rpcScore).toBeGreaterThanOrEqual(0.8);
      expect(result.matchType).toBe('high');
    });
    
    test('should calculate medium match score', () => {
      const source = { firstName: 'John', middleName: 'William', lastName: 'Smith' };
      const target = { firstName: 'Jon', middleName: '', lastName: 'Smyth' };
      
      const result = calculateRPCScore(source, target);
      
      expect(result.rpcScore).toBeGreaterThanOrEqual(0.5);
      expect(result.rpcScore).toBeLessThan(0.8);
      expect(result.matchType).toBe('medium');
    });
    
    test('should calculate low match score', () => {
      const source = { firstName: 'John', middleName: 'William', lastName: 'Smith' };
      const target = { firstName: 'Bob', middleName: '', lastName: 'Jones' };
      
      const result = calculateRPCScore(source, target);
      
      expect(result.rpcScore).toBeLessThan(0.5);
      expect(result.matchType).toBe('low');
    });
    
    test('should handle empty components', () => {
      const source = { firstName: 'John', middleName: '', lastName: 'Smith' };
      const target = { firstName: 'John', middleName: '', lastName: 'Smith' };
      
      const result = calculateRPCScore(source, target);
      
      expect(result.rpcScore).toBe(0.8); // 0.4 (first) + 0 (middle) + 0.4 (last)
      expect(result.matchType).toBe('high');
    });
  });
  
  describe('calculateWPCScore', () => {
    test('should return inverse of RPC score', () => {
      expect(calculateWPCScore(1)).toBe(0);
      expect(calculateWPCScore(0)).toBe(1);
      expect(calculateWPCScore(0.75)).toBe(0.25);
    });
  });
  
  describe('processContactScoring', () => {
    test('should process contact scoring correctly', () => {
      const sourceContact = {
        id: '123',
        first_name: 'John',
        middle_name: 'William',
        last_name: 'Smith',
        phone: '1234567890'
      };
      
      const lookupResult = {
        name: 'John W Smith',
        phone: '1234567890'
      };
      
      const result = processContactScoring(sourceContact, lookupResult);
      
      expect(result.entryId).toBe('123');
      expect(result.rpcScore).toBeGreaterThanOrEqual(0.8);
      expect(result.matchType).toBe('high');
      expect(result.sourceName).toBe('John William Smith');
      expect(result.matchedName).toBe('John W Smith');
      expect(result.matchBreakdown).toBeDefined();
      expect(result.priorityChange).toBe(false);
    });
    
    test('should handle missing lookup data', () => {
      const sourceContact = {
        id: '123',
        first_name: 'John',
        middle_name: 'William',
        last_name: 'Smith',
        phone: '1234567890'
      };
      
      const lookupResult = {
        phone: '1234567890'
      };
      
      const result = processContactScoring(sourceContact, lookupResult);
      
      expect(result.entryId).toBe('123');
      expect(result.rpcScore).toBe(0);
      expect(result.wpcScore).toBe(1);
      expect(result.matchType).toBe('none');
    });
    
    test('should detect priority change when WPC is high and RPC is low', () => {
      const sourceContact = {
        id: '123',
        first_name: 'John',
        middle_name: 'William',
        last_name: 'Smith',
        phone: '1234567890'
      };
      
      const lookupResult = {
        name: 'Robert Johnson',
        phone: '1234567890'
      };
      
      const result = processContactScoring(sourceContact, lookupResult);
      
      expect(result.rpcScore).toBeLessThan(0.5);
      expect(result.wpcScore).toBeGreaterThan(0.8);
      expect(result.priorityChange).toBe(true);
    });
  });
});
