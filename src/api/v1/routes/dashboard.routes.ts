import express from 'express';
import { authenticateJWT, validateTenant } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @route GET /v1/dashboard
 * @desc Get dashboard summary data
 * @access Private
 */
router.get('/', authenticateJWT, validateTenant, (req, res) => {
  const dashboardData = {
    totalLists: 12,
    activeCampaigns: 3,
    recentActivity: [
      {
        activityId: 1,
        userId: 1,
        timestamp: new Date().toISOString(),
        actionType: 'list_created',
        details: { listId: 5, listName: 'New Marketing Contacts' },
        tenantId: 1
      }
    ]
  };
  
  return res.status(200).json(dashboardData);
});

/**
 * @route GET /v1/dashboard/activities
 * @desc Get recent user activities
 * @access Private
 */
router.get('/activities', authenticateJWT, validateTenant, (req, res) => {
  const activities = [
    {
      activityId: 1,
      userId: 1,
      timestamp: new Date().toISOString(),
      actionType: 'list_created',
      details: { listId: 5, listName: 'New Marketing Contacts' },
      tenantId: 1
    },
    {
      activityId: 2,
      userId: 1,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      actionType: 'enrichment_completed',
      details: { planId: 2, planName: 'Standard Enrichment' },
      tenantId: 1
    }
  ];
  
  return res.status(200).json(activities);
});

/**
 * @route GET /v1/dashboard/healthchecks
 * @desc Get system health check results
 * @access Private
 */
router.get('/healthchecks', authenticateJWT, validateTenant, (req, res) => {
  const healthChecks = [
    {
      checkId: 1,
      timestamp: new Date().toISOString(),
      checkType: 'database_connection',
      status: 'Pass',
      details: { responseTime: '45ms' },
      tenantId: 1
    },
    {
      checkId: 2,
      timestamp: new Date().toISOString(),
      checkType: 'redis_connection',
      status: 'Pass',
      details: { responseTime: '12ms' },
      tenantId: 1
    }
  ];
  
  return res.status(200).json(healthChecks);
});

/**
 * @route GET /v1/dashboard/campaigns
 * @desc Get campaign performance metrics
 * @access Private
 */
router.get('/campaigns', authenticateJWT, validateTenant, (req, res) => {
  const campaigns = [
    {
      campaignId: 1,
      successRate: 0.85,
      tenantId: 1
    },
    {
      campaignId: 2,
      successRate: 0.72,
      tenantId: 1
    }
  ];
  
  return res.status(200).json(campaigns);
});

export default router;
