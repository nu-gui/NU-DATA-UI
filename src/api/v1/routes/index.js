/**
 * API Routes Index
 * 
 * Registers all API routes
 */

const express = require('express');
const router = express.Router();

const enrichmentRoutes = require('./enrichment.routes');
const scoringRoutes = require('./scoring.routes');
const analyticsRoutes = require('./analytics.routes');
const exportRoutes = require('./export.routes');

router.use('/enrichment-plans', enrichmentRoutes);
router.use('/scoring', scoringRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/export', exportRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
