import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import { autoSeed } from './autoSeed.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/error.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:5174',
].filter(Boolean);
app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    if (/\.vercel\.app$/.test(origin)) return cb(null, true);
    cb(new Error('CORS'));
  },
}));
app.use(express.json());
app.use(morgan('dev'));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/contact', contactRoutes); // public: POST a message
app.use('/api/messages', messageRoutes); // admin: read/manage messages
app.use('/api/upload', uploadRoutes);

// 404 + error handler (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => autoSeed())
  .then(() => {
    app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('✗ Failed to start server:', err.message);
    process.exit(1);
  });
