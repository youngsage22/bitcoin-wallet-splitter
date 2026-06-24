import { Router, Request, Response } from 'express';
import { saveRecipientAddresses, getRecipientAddresses } from '../services/configService';

export const configurationRoutes = Router();

// Get configured recipient addresses
configurationRoutes.get('/recipients', async (req: Request, res: Response) => {
  try {
    const addresses = await getRecipientAddresses();
    res.json({ recipients: addresses });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Set recipient addresses (up to 5)
configurationRoutes.post('/recipients', async (req: Request, res: Response) => {
  try {
    const { addresses } = req.body;
    
    if (!addresses || !Array.isArray(addresses)) {
      return res.status(400).json({ error: 'Invalid addresses array' });
    }
    
    if (addresses.length > 5) {
      return res.status(400).json({ error: 'Maximum 5 recipient addresses allowed' });
    }
    
    const result = await saveRecipientAddresses(addresses);
    res.json({ success: true, recipients: result });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update distribution percentages
configurationRoutes.post('/distribution', async (req: Request, res: Response) => {
  try {
    const { percentages } = req.body;
    
    if (!percentages || percentages.length !== 5) {
      return res.status(400).json({ error: 'Exactly 5 percentages required' });
    }
    
    const total = percentages.reduce((a: number, b: number) => a + b, 0);
    if (Math.abs(total - 100) > 0.01) {
      return res.status(400).json({ error: 'Percentages must sum to 100%' });
    }
    
    // TODO: Save distribution percentages
    res.json({ success: true, percentages });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
