#!/usr/bin/env node

// Test script to check server configuration and port availability
const net = require('net');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

console.log('🔍 Testing server configuration...\n');

// Check if port is available
function checkPort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false);
      } else {
        reject(err);
      }
    });
  });
}

async function test() {
  console.log(`Port: ${PORT}`);
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@') : 'NOT SET'}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? 'SET' : 'NOT SET'}`);
  console.log('');

  // Check port
  const portAvailable = await checkPort(PORT);
  if (portAvailable) {
    console.log(`✅ Port ${PORT} is available`);
  } else {
    console.log(`❌ Port ${PORT} is already in use!`);
    console.log('');
    console.log('To find what is using the port:');
    console.log(`  lsof -i :${PORT}`);
    console.log('');
    console.log('To kill the process:');
    console.log(`  lsof -ti:${PORT} | xargs kill -9`);
    console.log('');
    console.log('Or use a different port:');
    console.log('  PORT=5001 npm run dev');
    process.exit(1);
  }

  // Check DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.log('❌ DATABASE_URL is not set!');
    process.exit(1);
  }

  if (process.env.DATABASE_URL.includes('username:password')) {
    console.log('⚠️  DATABASE_URL contains placeholder values');
    console.log('This will cause authentication errors!');
    console.log('Update server/.env with real credentials');
    process.exit(1);
  }

  // Check JWT_SECRET
  if (!process.env.JWT_SECRET) {
    console.log('⚠️  JWT_SECRET is not set!');
    console.log('Generate one: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"');
  }

  console.log('');
  console.log('✅ All checks passed! Server should start successfully.');
}

test().catch(console.error);

