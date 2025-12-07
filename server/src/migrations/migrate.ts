import { pool } from '../config/database';

async function migrate() {
  try {
    console.log('🔄 Running database migrations...');

    // Test connection first
    await pool.query('SELECT NOW()');
    console.log('✅ Connected to database');

    // Create users table
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

    console.log('✅ Database migrations completed successfully');
    await pool.end();
    process.exit(0);
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED') {
      console.error('❌ Cannot connect to PostgreSQL database!');
      console.error('');
      console.error('Please make sure:');
      console.error('1. PostgreSQL is installed and running');
      console.error('2. Database "testwebservice" exists');
      console.error('3. DATABASE_URL in .env file is correct');
      console.error('');
      console.error('To install PostgreSQL on macOS:');
      console.error('  brew install postgresql@14');
      console.error('  brew services start postgresql@14');
      console.error('');
      console.error('To create database:');
      console.error('  createdb testwebservice');
      console.error('  # or');
      console.error('  psql -c "CREATE DATABASE testwebservice;"');
    } else {
      console.error('❌ Migration error:', error.message || error);
    }
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

migrate();

