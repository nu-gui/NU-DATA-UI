import express from 'express';
import { authenticateJWT, validateTenant } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @route GET /v1/enrichment-plans
 * @desc Get all enrichment plans
 * @access Private
 */
router.get('/', authenticateJWT, validateTenant, (req, res) => {
  const plans = [
    {
      planId: 1,
      planName: 'Standard Enrichment',
      preProcessingTasks: ['deduplication', 'validation'],
      processingTasks: ['name_matching', 'address_verification'],
      postProcessingTasks: ['scoring', 'grouping'],
      exportConnectionId: 1,
      tenantId: 1
    },
    {
      planId: 2,
      planName: 'Advanced Enrichment',
      preProcessingTasks: ['deduplication', 'validation', 'normalization'],
      processingTasks: ['name_matching', 'address_verification', 'phone_validation'],
      postProcessingTasks: ['scoring', 'grouping', 'tagging'],
      exportConnectionId: 2,
      tenantId: 1
    }
  ];
  
  return res.status(200).json(plans);
});

/**
 * @route POST /v1/enrichment-plans
 * @desc Create new enrichment plan
 * @access Private
 */
router.post('/', authenticateJWT, validateTenant, (req, res) => {
  const newPlan = req.body;
  
  const createdPlan = {
    ...newPlan,
    planId: 3, // Generated ID
    tenantId: 1 // From JWT token
  };
  
  return res.status(201).json(createdPlan);
});

/**
 * @route GET /v1/enrichment-plans/:planId
 * @desc Get an enrichment plan by ID
 * @access Private
 */
router.get('/:planId', authenticateJWT, validateTenant, (req, res) => {
  const { planId } = req.params;
  
  const plan = {
    planId: parseInt(planId),
    planName: 'Standard Enrichment',
    preProcessingTasks: ['deduplication', 'validation'],
    processingTasks: ['name_matching', 'address_verification'],
    postProcessingTasks: ['scoring', 'grouping'],
    exportConnectionId: 1,
    tenantId: 1
  };
  
  return res.status(200).json(plan);
});

/**
 * @route PUT /v1/enrichment-plans/:planId
 * @desc Update an enrichment plan
 * @access Private
 */
router.put('/:planId', authenticateJWT, validateTenant, (req, res) => {
  const { planId } = req.params;
  const updatedPlan = req.body;
  
  const plan = {
    ...updatedPlan,
    planId: parseInt(planId),
    tenantId: 1 // From JWT token
  };
  
  return res.status(200).json(plan);
});

/**
 * @route DELETE /v1/enrichment-plans/:planId
 * @desc Delete an enrichment plan
 * @access Private
 */
router.delete('/:planId', authenticateJWT, validateTenant, (req, res) => {
  return res.status(204).send();
});

/**
 * @route GET /v1/enrichment-plans/:planId/tasks
 * @desc Get tasks for enrichment plan
 * @access Private
 */
router.get('/:planId/tasks', authenticateJWT, validateTenant, (req, res) => {
  const { planId } = req.params;
  
  const tasks = [
    'deduplication',
    'validation',
    'name_matching',
    'address_verification',
    'scoring',
    'grouping'
  ];
  
  return res.status(200).json(tasks);
});

/**
 * @route POST /v1/enrichment-plans/:planId/tasks
 * @desc Add tasks to enrichment plan
 * @access Private
 */
router.post('/:planId/tasks', authenticateJWT, validateTenant, (req, res) => {
  const { planId } = req.params;
  const newTasks = req.body;
  
  return res.status(201).json({ message: 'Tasks added successfully', count: newTasks.length });
});

/**
 * @route POST /v1/enrichment-plans/:planId/execute
 * @desc Execute an enrichment plan on a list
 * @access Private
 */
router.post('/:planId/execute', authenticateJWT, validateTenant, (req, res) => {
  const { planId } = req.params;
  const { listId } = req.body;
  
  if (!listId) {
    return res.status(400).json({ code: 400, message: 'List ID is required' });
  }
  
  return res.status(202).json({ 
    message: 'Enrichment job started',
    jobId: Math.floor(Math.random() * 1000),
    planId: parseInt(planId),
    listId: listId,
    status: 'processing'
  });
});

/**
 * @route GET /v1/enriched-data
 * @desc Get enriched data
 * @access Private
 */
router.get('/enriched-data', authenticateJWT, validateTenant, (req, res) => {
  const enrichedData = [
    {
      id: 1,
      originalData: { name: 'John Doe', phone: '1234567890' },
      enrichedData: { 
        name: 'John Doe',
        phone: '+11234567890',
        address: '123 Main St, Anytown, USA',
        email: 'john.doe@example.com',
        rpcScore: 0.85
      },
      listId: 1,
      tenantId: 1
    },
    {
      id: 2,
      originalData: { name: 'Jane Smith', phone: '0987654321' },
      enrichedData: { 
        name: 'Jane Smith',
        phone: '+10987654321',
        address: '456 Oak Ave, Somewhere, USA',
        email: 'jane.smith@example.com',
        rpcScore: 0.92
      },
      listId: 1,
      tenantId: 1
    }
  ];
  
  return res.status(200).json(enrichedData);
});

export default router;
