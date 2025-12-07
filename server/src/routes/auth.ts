import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { pool } from '../config/database';

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      // Check if user exists
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
      );

      const user = result.rows[0];

      // Generate JWT
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return res.status(500).json({ error: 'JWT secret not configured' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      console.error('Register error:', error);
      
      // PostgreSQL errors
      if (error.code === '23505') { // Unique violation
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      if (error.code === '42P01') { // Table doesn't exist
        return res.status(500).json({ error: 'Database table not found. Please run migrations.' });
      }
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        return res.status(503).json({ error: 'Database connection failed. Please check database configuration.' });
      }
      if (error.code === '28P01') { // Authentication failed
        return res.status(503).json({ error: 'Database authentication failed. Please check DATABASE_URL.' });
      }
      if (error.code === '3D000') { // Database doesn't exist
        return res.status(503).json({ error: 'Database does not exist. Please create the database first.' });
      }
      
      res.status(500).json({ 
        error: error.message || 'Internal server error',
        code: error.code 
      });
    }
  }
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const result = await pool.query(
        'SELECT id, name, email, password FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = result.rows[0];

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return res.status(500).json({ error: 'JWT secret not configured' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        jwtSecret,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error: any) {
      console.error('Login error:', error);
      
      // PostgreSQL errors
      if (error.code === '42P01') { // Table doesn't exist
        return res.status(500).json({ error: 'Database table not found. Please run migrations.' });
      }
      if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        return res.status(503).json({ error: 'Database connection failed. Please check database configuration.' });
      }
      if (error.code === '28P01') { // Authentication failed
        return res.status(503).json({ error: 'Database authentication failed. Please check DATABASE_URL.' });
      }
      if (error.code === '3D000') { // Database doesn't exist
        return res.status(503).json({ error: 'Database does not exist. Please create the database first.' });
      }
      
      res.status(500).json({ 
        error: error.message || 'Internal server error',
        code: error.code 
      });
    }
  }
);

export default router;

