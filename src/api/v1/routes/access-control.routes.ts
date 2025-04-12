import express from 'express';
import { authenticateJWT, validateTenant, requireAdmin } from '../middleware/auth.middleware';

const blacklistRouter = express.Router();
const whitelistRouter = express.Router();

/**
 * @route GET /v1/blacklist
 * @desc Get all blacklisted values
 * @access Private (Admin)
 */
blacklistRouter.get('/', authenticateJWT, validateTenant, requireAdmin, (req, res) => {
  const blacklist = [
    {
      id: 1,
      value: 'spam@example.com',
      type: 'email',
      reason: 'Known spam source',
      createdAt: '2025-03-15T10:00:00Z',
      createdBy: 'admin@example.com',
      tenantId: 1
    },
    {
      id: 2,
      value: '+1555123456',
      type: 'phone',
      reason: 'Reported as spam',
      createdAt: '2025-03-20T14:30:00Z',
      createdBy: 'admin@example.com',
      tenantId: 1
    }
  ];
  
  return res.status(200).json(blacklist);
});

/**
 * @route POST /v1/blacklist
 * @desc Add a value to the blacklist
 * @access Private (Admin)
 */
blacklistRouter.post('/', authenticateJWT, validateTenant, requireAdmin, (req, res) => {
  const { value, type, reason } = req.body;
  
  if (!value || !type) {
    return res.status(400).json({ code: 400, message: 'Value and type are required' });
  }
  
  const blacklistEntry = {
    id: Math.floor(Math.random() * 1000),
    value,
    type,
    reason: reason || null,
    createdAt: new Date().toISOString(),
    createdBy: 'admin@example.com', // In production, get from JWT
    tenantId: 1 // From JWT token
  };
  
  return res.status(201).json(blacklistEntry);
});

/**
 * @route DELETE /v1/blacklist/:id
 * @desc Remove a value from the blacklist
 * @access Private (Admin)
 */
blacklistRouter.delete('/:id', authenticateJWT, validateTenant, requireAdmin, (req, res) => {
  return res.status(204).send();
});

/**
 * @route GET /v1/blacklist/check
 * @desc Check if a value is blacklisted
 * @access Private
 */
blacklistRouter.get('/check', authenticateJWT, validateTenant, (req, res) => {
  const { value, type } = req.query;
  
  if (!value || !type) {
    return res.status(400).json({ code: 400, message: 'Value and type are required' });
  }
  
  const isBlacklisted = Math.random() > 0.7; // 30% chance of being blacklisted
  
  return res.status(200).json({
    value,
    type,
    isBlacklisted,
    reason: isBlacklisted ? 'Known spam source' : null
  });
});

/**
 * @route GET /v1/whitelist
 * @desc Get all whitelisted values
 * @access Private (Admin)
 */
whitelistRouter.get('/', authenticateJWT, validateTenant, requireAdmin, (req, res) => {
  const whitelist = [
    {
      id: 1,
      value: 'vip@example.com',
      type: 'email',
      reason: 'VIP customer',
      createdAt: '2025-03-10T09:00:00Z',
      createdBy: 'admin@example.com',
      tenantId: 1
    },
    {
      id: 2,
      value: '+1555987654',
      type: 'phone',
      reason: 'Partner company',
      createdAt: '2025-03-12T11:15:00Z',
      createdBy: 'admin@example.com',
      tenantId: 1
    }
  ];
  
  return res.status(200).json(whitelist);
});

/**
 * @route POST /v1/whitelist
 * @desc Add a value to the whitelist
 * @access Private (Admin)
 */
whitelistRouter.post('/', authenticateJWT, validateTenant, requireAdmin, (req, res) => {
  const { value, type, reason } = req.body;
  
  if (!value || !type) {
    return res.status(400).json({ code: 400, message: 'Value and type are required' });
  }
  
  const whitelistEntry = {
    id: Math.floor(Math.random() * 1000),
    value,
    type,
    reason: reason || null,
    createdAt: new Date().toISOString(),
    createdBy: 'admin@example.com', // In production, get from JWT
    tenantId: 1 // From JWT token
  };
  
  return res.status(201).json(whitelistEntry);
});

/**
 * @route DELETE /v1/whitelist/:id
 * @desc Remove a value from the whitelist
 * @access Private (Admin)
 */
whitelistRouter.delete('/:id', authenticateJWT, validateTenant, requireAdmin, (req, res) => {
  return res.status(204).send();
});

/**
 * @route GET /v1/whitelist/check
 * @desc Check if a value is whitelisted
 * @access Private
 */
whitelistRouter.get('/check', authenticateJWT, validateTenant, (req, res) => {
  const { value, type } = req.query;
  
  if (!value || !type) {
    return res.status(400).json({ code: 400, message: 'Value and type are required' });
  }
  
  const isWhitelisted = Math.random() > 0.7; // 30% chance of being whitelisted
  
  return res.status(200).json({
    value,
    type,
    isWhitelisted,
    reason: isWhitelisted ? 'VIP customer' : null
  });
});

export default {
  blacklistRouter,
  whitelistRouter
};
