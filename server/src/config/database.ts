import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set in .env file!');
  console.error('Please set DATABASE_URL in server/.env file');
  throw new Error('DATABASE_URL is required');
}

// Check for placeholder values
if (process.env.DATABASE_URL.includes('username:password')) {
  console.warn('⚠️  DATABASE_URL contains placeholder values (username:password)');
  console.warn('This will cause authentication errors!');
  console.warn('Please update server/.env with real database credentials');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Initialize database - create table if not exists
export const initializeDatabase = async () => {
  try {
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to PostgreSQL database');

    // Create users table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        bio TEXT,
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table ready');
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Cannot connect to PostgreSQL database!');
      console.error('Please check:');
      console.error('1. PostgreSQL is running');
      console.error('2. Database exists');
      console.error('3. DATABASE_URL in .env is correct');
    } else {
      console.error('❌ Database initialization error:', error.message);
    }
    throw error;
  }
};

// Test connection
pool.on('connect', () => {
  console.log('✅ New PostgreSQL connection established');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  // Don't exit in production, just log
  if (process.env.NODE_ENV !== 'production') {
    // process.exit(-1);
  }
});

