/**
 * Scoring Controller
 * 
 * Handles API endpoints for RPC/WPC scoring and name matching
 */

const { processContactScoring } = require('../../../services/scoring/rpcScoring');
const { matchFullNames } = require('../../../services/scoring/nameMatching');
const pool = require('../../../config/database');

/**
 * Process RPC/WPC scoring for a list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function processListScoring(req, res) {
  const { listId } = req.params;
  const { tenantId } = req.user;
  
  try {
    const client = req.dbClient || await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const listEntriesResult = await client.query(
        'SELECT * FROM app.list_entries WHERE list_id = $1 AND tenant_id = $2',
        [listId, tenantId]
      );
      
      const listEntries = listEntriesResult.rows;
      
      if (listEntries.length === 0) {
        return res.status(404).json({ error: 'List entries not found' });
      }
      
      const scoringResults = [];
      
      for (const entry of listEntries) {
        if (!entry.enrichment_data || !entry.enrichment_data.reverse_lookup) {
          continue;
        }
        
        const lookupResult = entry.enrichment_data.reverse_lookup;
        
        const scoringResult = processContactScoring(entry, lookupResult);
        
        const rpcScoreResult = await client.query(
          `INSERT INTO app.rpc_scores 
           (entry_id, match_type, rpc_score, source_name, matched_name, match_breakdown, priority_change, tenant_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING id`,
          [
            entry.id,
            scoringResult.matchType,
            scoringResult.rpcScore,
            scoringResult.sourceName,
            scoringResult.matchedName,
            scoringResult.matchBreakdown,
            scoringResult.priorityChange,
            tenantId
          ]
        );
        
        await client.query(
          `UPDATE app.list_entries 
           SET rpc_score = $1, wpc_score = $2, updated_at = NOW()
           WHERE id = $3 AND tenant_id = $4`,
          [scoringResult.rpcScore, scoringResult.wpcScore, entry.id, tenantId]
        );
        
        scoringResults.push({
          entryId: entry.id,
          rpcScore: scoringResult.rpcScore,
          wpcScore: scoringResult.wpcScore,
          matchType: scoringResult.matchType,
          priorityChange: scoringResult.priorityChange
        });
      }
      
      await client.query('COMMIT');
      
      return res.status(200).json({
        listId,
        processedEntries: scoringResults.length,
        scoringResults
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      if (!req.dbClient) {
        client.release();
      }
    }
  } catch (error) {
    console.error('Error processing list scoring:', error);
    return res.status(500).json({ error: 'Failed to process list scoring' });
  }
}

/**
 * Get RPC scores for a list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getListScores(req, res) {
  const { listId } = req.params;
  const { tenantId } = req.user;
  
  try {
    const client = req.dbClient || await pool.connect();
    
    try {
      const scoresResult = await client.query(
        `SELECT rs.* 
         FROM app.rpc_scores rs
         JOIN app.list_entries le ON rs.entry_id = le.id
         WHERE le.list_id = $1 AND rs.tenant_id = $2
         ORDER BY rs.rpc_score DESC`,
        [listId, tenantId]
      );
      
      const statsResult = await client.query(
        `SELECT 
           COUNT(*) FILTER (WHERE match_type = 'high') as high_matches,
           COUNT(*) FILTER (WHERE match_type = 'medium') as medium_matches,
           COUNT(*) FILTER (WHERE match_type = 'low') as low_matches,
           COUNT(*) FILTER (WHERE match_type = 'none') as no_matches,
           COUNT(*) FILTER (WHERE priority_change = true) as priority_changes,
           AVG(rpc_score) as avg_rpc_score
         FROM app.rpc_scores rs
         JOIN app.list_entries le ON rs.entry_id = le.id
         WHERE le.list_id = $1 AND rs.tenant_id = $2`,
        [listId, tenantId]
      );
      
      return res.status(200).json({
        listId,
        scores: scoresResult.rows,
        statistics: statsResult.rows[0]
      });
    } finally {
      if (!req.dbClient) {
        client.release();
      }
    }
  } catch (error) {
    console.error('Error getting list scores:', error);
    return res.status(500).json({ error: 'Failed to get list scores' });
  }
}

/**
 * Test name matching between two names
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function testNameMatching(req, res) {
  const { sourceName, targetName } = req.body;
  
  if (!sourceName || !targetName) {
    return res.status(400).json({ error: 'Source name and target name are required' });
  }
  
  try {
    const matchResult = matchFullNames(sourceName, targetName);
    
    return res.status(200).json({
      sourceName,
      targetName,
      score: matchResult.score,
      matchType: matchResult.matchType,
      components: matchResult.components,
      isSwapped: matchResult.isSwapped
    });
  } catch (error) {
    console.error('Error testing name matching:', error);
    return res.status(500).json({ error: 'Failed to test name matching' });
  }
}

module.exports = {
  processListScoring,
  getListScores,
  testNameMatching
};
