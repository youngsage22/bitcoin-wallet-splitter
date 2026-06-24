import { Router, Request, Response } from 'express';
import { generateWallet, getBalance, validateAddress } from '../services/walletService';

export const walletRoutes = Router();

// Get or create master wallet
walletRoutes.get('/master', async (req: Request, res: Response) => {
  try {
    const wallet = await generateWallet();
    res.json({
      address: wallet.address,
      publicKey: wallet.publicKey,
      network: process.env.BITCOIN_NETWORK || 'testnet'
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get wallet balance
walletRoutes.get('/balance/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    
    if (!validateAddress(address)) {
      return res.status(400).json({ error: 'Invalid Bitcoin address' });
    }
    
    const balance = await getBalance(address);
    res.json({ address, balance });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Validate address
walletRoutes.post('/validate', (req: Request, res: Response) => {
  try {
    const { address } = req.body;
    
    if (!address) {
      return res.status(400).json({ error: 'Address required' });
    }
    
    const isValid = validateAddress(address);
    res.json({ address, valid: isValid });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
