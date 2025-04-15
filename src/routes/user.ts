import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authenticateToken = (req: any, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || 'default-secret-key');
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

router.get('/profile', authenticateToken, (req: any, res) => {
  res.status(200).json(req.user);
});

export default router;
