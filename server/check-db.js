#!/usr/bin/env node

// Simple script to check database connection
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkDatabase() {
  console.log('🔍 Checking database connection...\n');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in .env file!');
    console.error('Please set DATABASE_URL in server/.env file');
    process.exit(1);
  }
  
  console.log('DATABASE_URL:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
  
  try {
    // Test connection
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
    console.log('   Server time:', result.rows[0].now);
    
    // Check if users table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Users table exists');
      
      // Count users
      const countResult = await pool.query('SELECT COUNT(*) FROM users');
      console.log('   Total users:', countResult.rows[0].count);
    } else {
      console.log('⚠️  Users table does not exist');
      console.log('   Run: npm run migrate');
    }
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database connection failed!\n');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Cannot connect to PostgreSQL server.');
      console.error('Please make sure PostgreSQL is running:');
      console.error('  brew services start postgresql@14');
    } else if (error.code === '28P01') {
      console.error('Authentication failed.');
      console.error('Please check username and password in DATABASE_URL');
    } else if (error.code === '3D000') {
      console.error('Database does not exist.');
      console.error('Please create the database:');
      console.error('  createdb testwebservice');
    } else if (error.code === 'ENOTFOUND') {
      console.error('Cannot resolve database host.');
      console.error('Please check DATABASE_URL');
    } else {
      console.error('Error:', error.message);
      console.error('Code:', error.code);
    }
    
    await pool.end().catch(() => {});
    process.exit(1);
  }
}

checkDatabase();

