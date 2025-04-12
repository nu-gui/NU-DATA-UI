/**
 * User model interface
 */
import { UUID } from 'crypto';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  READONLY = 'readonly'
}

export interface User {
  id: UUID;
  email: string;
  passwordHash: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  tenantId: UUID;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserRegistrationDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  tenantId: UUID;
}

export interface PasswordResetRequestDto {
  email: string;
}

export interface PasswordResetDto {
  token: string;
  newPassword: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  tenantId: string;
  iat?: number;
  exp?: number;
}
