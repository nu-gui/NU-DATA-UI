/**
 * Authentication service
 * Handles user authentication, token generation, and password management
 */
import { UUID } from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User, UserRole, TokenPayload, UserLoginDto, UserRegistrationDto, PasswordResetDto, PasswordResetRequestDto } from '../models/user.model';
import { logger } from '../../core/utils/logger';
import { loadCommonEnvVars } from '../../core/utils/env';

const env = loadCommonEnvVars();
const JWT_SECRET = env.JWT_SECRET || 'default-secret-key-for-development-only';
const JWT_EXPIRATION = env.JWT_EXPIRATION || '1h';
const SALT_ROUNDS = 10;

export class AuthService {
  /**
   * Generate JWT token for authenticated user
   * @param user User object
   * @returns JWT token
   */
  static generateToken(user: User): string {
    const payload: TokenPayload = {
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
      tenantId: user.tenantId.toString()
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }

  /**
   * Verify JWT token
   * @param token JWT token
   * @returns Decoded token payload or null if invalid
   */
  static verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
      logger.error(`Token verification failed: ${error}`);
      return null;
    }
  }

  /**
   * Hash password
   * @param password Plain text password
   * @returns Hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compare password with hash
   * @param password Plain text password
   * @param hash Hashed password
   * @returns True if password matches hash
   */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  
  /**
   * Verify password against hash
   * @param password Plain text password
   * @param hash Hashed password
   * @returns True if password matches hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return this.comparePassword(password, hash);
  }
  
  /**
   * Generate JWT token for user ID
   * @param userId User ID
   * @returns JWT token
   */
  static generateJwtToken(userId: string): string {
    const payload = {
      userId: userId.toString(),
      purpose: 'authentication'
    };
    
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }

  /**
   * Generate password reset token
   * @param userId User ID
   * @returns Password reset token
   */
  static generatePasswordResetToken(userId: UUID): string {
    const payload = {
      userId: userId.toString(),
      purpose: 'password-reset'
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  }

  /**
   * Verify password reset token
   * @param token Password reset token
   * @returns User ID if token is valid, null otherwise
   */
  static verifyPasswordResetToken(token: string): string | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; purpose: string };
      
      if (decoded.purpose !== 'password-reset') {
        return null;
      }
      
      return decoded.userId;
    } catch (error) {
      logger.error(`Password reset token verification failed: ${error}`);
      return null;
    }
  }

  /**
   * Check if user has required role
   * @param userRole User's role
   * @param requiredRole Required role
   * @returns True if user has required role
   */
  static hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
    if (userRole === UserRole.ADMIN) {
      return true;
    }

    if (userRole === UserRole.USER && requiredRole === UserRole.READONLY) {
      return true;
    }

    return userRole === requiredRole;
  }
}
