import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { walletRoutes } from './routes/wallet';
import { transactionRoutes } from './routes/transactions';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/wallet', walletRoutes);
app.use('/api/transactions', transactionRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Config endpoints
app.get('/api/config/recipients', (req: Request, res: Response) => {
  res.json({ recipients: [] });
});

app.post('/api/config/recipients', (req: Request, res: Response) => {
  const { addresses } = req.body;
  res.json({ success: true, recipients: addresses });
});

app.post('/api/config/distribution', (req: Request, res: Response) => {
  const { percentages } = req.body;
  res.json({ success: true, percentages });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
