import { generateToken, verifyToken } from '../../../src/services/auth/authService';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    test('should generate a token with user data', () => {
      const mockUser = { id: '123', email: 'test@example.com', role: 'user' };
      const mockToken = 'generated-token';
      
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);
      
      const result = generateToken(mockUser);
      
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: mockUser.id, email: mockUser.email, role: mockUser.role },
        expect.any(String),
        { expiresIn: expect.any(String) }
      );
      expect(result).toBe(mockToken);
    });
  });

  describe('verifyToken', () => {
    test('should verify and return decoded token data', () => {
      const mockToken = 'valid-token';
      const mockDecodedData = { id: '123', email: 'test@example.com', role: 'user' };
      
      (jwt.verify as jest.Mock).mockReturnValue(mockDecodedData);
      
      const result = verifyToken(mockToken);
      
      expect(jwt.verify).toHaveBeenCalledWith(mockToken, expect.any(String));
      expect(result).toEqual(mockDecodedData);
    });

    test('should throw error for invalid token', () => {
      const mockToken = 'invalid-token';
      
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });
      
      expect(() => verifyToken(mockToken)).toThrow('Invalid token');
    });
  });
});
