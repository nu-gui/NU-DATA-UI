import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key';

interface User {
  id: string;
  email: string;
  role: string;
}

export const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, SECRET_KEY);
};
