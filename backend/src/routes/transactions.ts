import { Router, Request, Response } from 'express';
import { sendTransaction, getTransactionHistory } from '../services/transactionService';

export const transactionRoutes = Router();

// Send BTC from master wallet to recipients
transactionRoutes.post('/send', async (req: Request, res: Response) => {
  try {
    const { recipientAddresses, amounts } = req.body;
    
    if (!recipientAddresses || !Array.isArray(recipientAddresses)) {
      return res.status(400).json({ error: 'Invalid recipient addresses' });
    }
    
    if (recipientAddresses.length !== 5) {
      return res.status(400).json({ error: 'Exactly 5 recipient addresses required' });
    }
    
    const txResult = await sendTransaction(recipientAddresses, amounts);
    res.json({ success: true, transactionId: txResult.txId, details: txResult });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction history
transactionRoutes.get('/history', async (req: Request, res: Response) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const history = await getTransactionHistory(Number(limit), Number(offset));
    res.json({ transactions: history });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction details
transactionRoutes.get('/:txId', async (req: Request, res: Response) => {
  try {
    const { txId } = req.params;
    // TODO: Implement transaction lookup
    res.json({ txId, status: 'pending' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
