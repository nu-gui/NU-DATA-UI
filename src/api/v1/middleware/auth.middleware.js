/**
 * Authentication Middleware
 * 
 * JWT authentication and tenant validation middleware
 */

const jwt = require('jsonwebtoken');

/**
 * Authenticate JWT token
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-key');
    
    req.user = {
      id: decoded.userId,
      tenantId: decoded.tenantId,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

/**
 * Validate tenant access
 */
const validateTenant = (req, res, next) => {
  if (!req.user || !req.user.tenantId) {
    return res.status(403).json({ error: 'Tenant access required' });
  }
  
  next();
};

module.exports = {
  authenticateJWT,
  validateTenant
};
