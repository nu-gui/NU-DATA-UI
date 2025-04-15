import express from 'express';
import { generateToken } from '../services/auth/authService';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'test@example.com' && password === 'password123') {
    const user = { id: '123', email, role: 'user' };
    const token = generateToken(user);
    
    return res.status(200).json({ token, user });
  }
  
  return res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
