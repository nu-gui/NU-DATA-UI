import express from 'express';
import { authenticateJWT, validateTenant } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @route GET /v1/search
 * @desc Search across all data types
 * @access Private
 */
router.get('/', authenticateJWT, validateTenant, (req, res) => {
  const { query, type, limit, offset } = req.query;
  
  if (!query) {
    return res.status(400).json({ code: 400, message: 'Search query is required' });
  }
  
  const results = {
    query: query,
    type: type || 'all',
    totalResults: 42,
    limit: parseInt(limit as string) || 10,
    offset: parseInt(offset as string) || 0,
    results: [
      {
        id: 1,
        type: 'list',
        title: 'Marketing Contacts 2025',
        snippet: 'List containing marketing contacts for 2025 campaign',
        score: 0.95,
        url: '/lists/1'
      },
      {
        id: 101,
        type: 'list_entry',
        title: 'John Doe',
        snippet: 'Email: john@example.com, Phone: +1234567890',
        score: 0.87,
        url: '/lists/1/entries/101'
      },
      {
        id: 5,
        type: 'enrichment_plan',
        title: 'Standard Enrichment',
        snippet: 'Basic enrichment plan with name matching and address verification',
        score: 0.82,
        url: '/enrichment-plans/5'
      }
    ]
  };
  
  return res.status(200).json(results);
});

/**
 * @route GET /v1/search/lists
 * @desc Search only in lists
 * @access Private
 */
router.get('/lists', authenticateJWT, validateTenant, (req, res) => {
  const { query, limit, offset } = req.query;
  
  if (!query) {
    return res.status(400).json({ code: 400, message: 'Search query is required' });
  }
  
  const results = {
    query: query,
    type: 'list',
    totalResults: 15,
    limit: parseInt(limit as string) || 10,
    offset: parseInt(offset as string) || 0,
    results: [
      {
        id: 1,
        title: 'Marketing Contacts 2025',
        snippet: 'List containing marketing contacts for 2025 campaign',
        score: 0.95,
        metadata: { tags: ['marketing', '2025'] }
      },
      {
        id: 2,
        title: 'Enriched Customer Database',
        snippet: 'Fully enriched customer database with verified information',
        score: 0.82,
        metadata: { tags: ['customers', 'enriched'] }
      }
    ]
  };
  
  return res.status(200).json(results);
});

/**
 * @route GET /v1/search/entries
 * @desc Search in list entries
 * @access Private
 */
router.get('/entries', authenticateJWT, validateTenant, (req, res) => {
  const { query, listId, limit, offset } = req.query;
  
  if (!query) {
    return res.status(400).json({ code: 400, message: 'Search query is required' });
  }
  
  const results = {
    query: query,
    type: 'list_entry',
    listId: listId || 'all',
    totalResults: 27,
    limit: parseInt(limit as string) || 10,
    offset: parseInt(offset as string) || 0,
    results: [
      {
        id: 101,
        listId: 1,
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890'
        },
        score: 0.87
      },
      {
        id: 102,
        listId: 1,
        data: {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+0987654321'
        },
        score: 0.75
      }
    ]
  };
  
  return res.status(200).json(results);
});

/**
 * @route GET /v1/search/enrichment-plans
 * @desc Search in enrichment plans
 * @access Private
 */
router.get('/enrichment-plans', authenticateJWT, validateTenant, (req, res) => {
  const { query, limit, offset } = req.query;
  
  if (!query) {
    return res.status(400).json({ code: 400, message: 'Search query is required' });
  }
  
  const results = {
    query: query,
    type: 'enrichment_plan',
    totalResults: 8,
    limit: parseInt(limit as string) || 10,
    offset: parseInt(offset as string) || 0,
    results: [
      {
        id: 5,
        planName: 'Standard Enrichment',
        snippet: 'Basic enrichment plan with name matching and address verification',
        score: 0.82
      },
      {
        id: 6,
        planName: 'Advanced Enrichment',
        snippet: 'Comprehensive enrichment with all available data sources',
        score: 0.78
      }
    ]
  };
  
  return res.status(200).json(results);
});

/**
 * @route POST /v1/search/advanced
 * @desc Advanced search with complex criteria
 * @access Private
 */
router.post('/advanced', authenticateJWT, validateTenant, (req, res) => {
  const { query, filters, sort, limit, offset } = req.body;
  
  if (!query) {
    return res.status(400).json({ code: 400, message: 'Search query is required' });
  }
  
  const results = {
    query: query,
    filters: filters || {},
    sort: sort || { field: 'score', direction: 'desc' },
    totalResults: 42,
    limit: limit || 10,
    offset: offset || 0,
    results: [
      {
        id: 1,
        type: 'list',
        title: 'Marketing Contacts 2025',
        snippet: 'List containing marketing contacts for 2025 campaign',
        score: 0.95,
        url: '/lists/1'
      },
      {
        id: 101,
        type: 'list_entry',
        title: 'John Doe',
        snippet: 'Email: john@example.com, Phone: +1234567890',
        score: 0.87,
        url: '/lists/1/entries/101'
      }
    ]
  };
  
  return res.status(200).json(results);
});

/**
 * @route GET /v1/search/suggestions
 * @desc Get search suggestions as user types
 * @access Private
 */
router.get('/suggestions', authenticateJWT, validateTenant, (req, res) => {
  const { query, type, limit } = req.query;
  
  if (!query) {
    return res.status(400).json({ code: 400, message: 'Search query is required' });
  }
  
  const suggestions = {
    query: query,
    type: type || 'all',
    suggestions: [
      {
        text: `${query} marketing`,
        type: 'list',
        count: 5
      },
      {
        text: `${query} customer`,
        type: 'list',
        count: 3
      },
      {
        text: `${query}@example.com`,
        type: 'list_entry',
        count: 12
      }
    ]
  };
  
  return res.status(200).json(suggestions);
});

/**
 * @route GET /v1/search/recent
 * @desc Get user's recent searches
 * @access Private
 */
router.get('/recent', authenticateJWT, validateTenant, (req, res) => {
  const recentSearches = [
    {
      id: 1,
      query: 'marketing contacts',
      timestamp: '2025-04-01T10:15:00Z',
      resultCount: 15
    },
    {
      id: 2,
      query: 'john doe',
      timestamp: '2025-04-02T14:30:00Z',
      resultCount: 3
    },
    {
      id: 3,
      query: 'enrichment plan',
      timestamp: '2025-04-05T09:45:00Z',
      resultCount: 8
    }
  ];
  
  return res.status(200).json(recentSearches);
});

export default router;
