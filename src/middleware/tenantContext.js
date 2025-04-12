/**
 * Middleware to set tenant context for PostgreSQL RLS
 */
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

/**
 * Middleware to set tenant context based on JWT token
 */
const setTenantContext = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {
      id: decoded.userId,
      tenantId: decoded.tenantId,
      role: decoded.role
    };
    
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      if (decoded.tenantId) {
        await client.query('SELECT app.set_tenant_context($1)', [decoded.tenantId]);
      }
      
      await client.query('SELECT app.set_user_context($1)', [decoded.userId]);
      
      req.dbClient = client;
      
      next();
    } catch (err) {
      client.release();
      throw err;
    }
  } catch (error) {
    console.error('Error setting tenant context:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

/**
 * Middleware to reset tenant context and release DB client
 */
const resetTenantContext = async (req, res, next) => {
  if (req.dbClient) {
    try {
      await req.dbClient.query('SELECT app.reset_tenant_context()');
      
      await req.dbClient.query('COMMIT');
    } catch (error) {
      await req.dbClient.query('ROLLBACK');
      console.error('Error resetting tenant context:', error);
    } finally {
      req.dbClient.release();
      delete req.dbClient;
    }
  }
  next();
};

module.exports = {
  setTenantContext,
  resetTenantContext
};
