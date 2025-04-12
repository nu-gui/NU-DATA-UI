/**
 * Scoring Routes
 * 
 * API routes for RPC/WPC scoring and name matching
 */

const express = require('express');
const { authenticateJWT, validateTenant } = require('../middleware/auth.middleware');
const { setTenantContext, resetTenantContext } = require('../../../middleware/tenantContext');
const { 
  processListScoring, 
  getListScores, 
  testNameMatching 
} = require('../controllers/scoring.controller');

const router = express.Router();

/**
 * @route POST /api/v1/scoring/lists/:listId/process
 * @desc Process RPC/WPC scoring for a list
 * @access Private
 */
router.post(
  '/lists/:listId/process',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  processListScoring,
  resetTenantContext
);

/**
 * @route GET /api/v1/scoring/lists/:listId
 * @desc Get RPC scores for a list
 * @access Private
 */
router.get(
  '/lists/:listId',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  getListScores,
  resetTenantContext
);

/**
 * @route POST /api/v1/scoring/name-match/test
 * @desc Test name matching between two names
 * @access Private
 */
router.post(
  '/name-match/test',
  authenticateJWT,
  validateTenant,
  testNameMatching
);

module.exports = router;
