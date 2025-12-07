import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import { pool, initializeDatabase } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = process.env.NODE_ENV === 'production'
      ? (process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : [])
      : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'];
    
    // Разрешаем запросы без origin (например, Postman, мобильные приложения)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error: any) {
    res.status(500).json({ 
      status: 'error', 
      database: 'disconnected',
      error: error.message 
    });
  }
});

// Start server with database initialization
const startServer = async () => {
  try {
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL is not set in .env file!');
      console.error('Please set DATABASE_URL in server/.env file');
      console.error('Example: DATABASE_URL=postgresql://localhost:5432/testwebservice');
      process.exit(1);
    }

    // Check if DATABASE_URL contains placeholder values
    if (process.env.DATABASE_URL.includes('username:password')) {
      console.error('❌ DATABASE_URL contains placeholder values!');
      console.error('Please update server/.env with real database credentials');
      console.error('Example: DATABASE_URL=postgresql://localhost:5432/testwebservice');
      console.error('Or with user: DATABASE_URL=postgresql://your_user@localhost:5432/testwebservice');
      process.exit(1);
    }

    // Initialize database (create tables if needed)
    await initializeDatabase();
    
    // Try to start server, handle port conflicts
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API: http://localhost:${PORT}/api`);
      console.log(`💡 Health check: http://localhost:${PORT}/api/health`);
    });

    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.error('');
        console.error('Solutions:');
        console.error(`1. Stop the process using port ${PORT}:`);
        console.error(`   lsof -ti:${PORT} | xargs kill -9`);
        console.error(`2. Or change PORT in server/.env to another port (e.g., 5001)`);
        console.error(`3. Or use a different port: PORT=5001 npm run dev`);
      } else {
        console.error('❌ Server error:', error.message);
      }
      process.exit(1);
    });
  } catch (error: any) {
    console.error('❌ Failed to start server:', error.message);
    console.error('');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Database connection failed!');
      console.error('Please check:');
      console.error('1. PostgreSQL is installed and running');
      console.error('   macOS: brew services start postgresql@14');
      console.error('2. Database "testwebservice" exists');
      console.error('   createdb testwebservice');
      console.error('3. DATABASE_URL in server/.env is correct');
    } else if (error.code === '28P01') {
      console.error('Database authentication failed!');
      console.error('Please check DATABASE_URL in server/.env');
      console.error('Remove username:password if not needed:');
      console.error('  DATABASE_URL=postgresql://localhost:5432/testwebservice');
    } else if (error.code === '3D000') {
      console.error('Database does not exist!');
      console.error('Create it with: createdb testwebservice');
    } else {
      console.error('Please check:');
      console.error('1. PostgreSQL is installed and running');
      console.error('2. Database "testwebservice" exists');
      console.error('3. DATABASE_URL in server/.env is correct');
    }
    
    console.error('');
    console.error('Run diagnostics: cd server && npm run check-db');
    process.exit(1);
  }
};

startServer();

