import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.SECRET;

export default function authMiddleware(req, res, next) {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    return res.status(403).json({
      msg: 'Authorization header missing or malformed. Please provide a valid token',
    });
  }
  const token = authHeaders.split(' ')[1];
  try {
    const verified = jwt.verify(token, SECRET);
    if (!verified || !verified.userId) {
      return res.status(500).json({
        msg: 'authorization failed. Invalid token',
      });
    }

    req.userId = verified.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'authorization failed',
    });
  }
}
