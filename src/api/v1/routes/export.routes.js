/**
 * Export Routes
 * 
 * API routes for export job management
 */

const express = require('express');
const { authenticateJWT, validateTenant } = require('../middleware/auth.middleware');
const { setTenantContext, resetTenantContext } = require('../../../middleware/tenantContext');
const { 
  createExportJob,
  getExportJobStatus,
  updateExportJobStatus,
  downloadExportedData
} = require('../controllers/export.controller');

const router = express.Router();

/**
 * @route POST /api/v1/export
 * @desc Create a new export job
 * @access Private
 */
router.post(
  '/',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  createExportJob,
  resetTenantContext
);

/**
 * @route GET /api/v1/export/:jobId
 * @desc Get export job status
 * @access Private
 */
router.get(
  '/:jobId',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  getExportJobStatus,
  resetTenantContext
);

/**
 * @route PUT /api/v1/export/:jobId
 * @desc Update export job status
 * @access Private
 */
router.put(
  '/:jobId',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  updateExportJobStatus,
  resetTenantContext
);

/**
 * @route GET /api/v1/export/:jobId/data
 * @desc Download exported data
 * @access Private
 */
router.get(
  '/:jobId/data',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  downloadExportedData,
  resetTenantContext
);

module.exports = router;
