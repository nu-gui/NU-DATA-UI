/**
 * Analytics Routes
 * 
 * API routes for export analytics and dashboard metrics
 */

const express = require('express');
const { authenticateJWT, validateTenant } = require('../middleware/auth.middleware');
const { setTenantContext, resetTenantContext } = require('../../../middleware/tenantContext');
const { 
  getExportAnalyticsSummary,
  getExportAnalyticsByDate,
  getExportAnalyticsByTag,
  getEnrichmentPlanUsage,
  getRecentHighVolumeExports,
  exportAnalyticsCSV,
  exportAnalyticsPDF
} = require('../controllers/analytics.controller');

const router = express.Router();

/**
 * @route GET /api/v1/analytics/exports/summary
 * @desc Get export analytics summary
 * @access Private
 */
router.get(
  '/exports/summary',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  getExportAnalyticsSummary,
  resetTenantContext
);

/**
 * @route GET /api/v1/analytics/exports/by-date
 * @desc Get export analytics by date range
 * @access Private
 */
router.get(
  '/exports/by-date',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  getExportAnalyticsByDate,
  resetTenantContext
);

/**
 * @route GET /api/v1/analytics/exports/by-tag
 * @desc Get export analytics by tag
 * @access Private
 */
router.get(
  '/exports/by-tag',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  getExportAnalyticsByTag,
  resetTenantContext
);

/**
 * @route GET /api/v1/analytics/enrichment-plans/usage
 * @desc Get enrichment plan usage
 * @access Private
 */
router.get(
  '/enrichment-plans/usage',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  getEnrichmentPlanUsage,
  resetTenantContext
);

/**
 * @route GET /api/v1/analytics/exports/high-volume
 * @desc Get recent high-volume exports
 * @access Private
 */
router.get(
  '/exports/high-volume',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  getRecentHighVolumeExports,
  resetTenantContext
);

/**
 * @route GET /api/v1/analytics/exports/download/csv
 * @desc Export analytics data as CSV
 * @access Private
 */
router.get(
  '/exports/download/csv',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  exportAnalyticsCSV,
  resetTenantContext
);

/**
 * @route GET /api/v1/analytics/exports/download/pdf
 * @desc Export analytics data as PDF
 * @access Private
 */
router.get(
  '/exports/download/pdf',
  authenticateJWT,
  validateTenant,
  setTenantContext,
  exportAnalyticsPDF,
  resetTenantContext
);

module.exports = router;
