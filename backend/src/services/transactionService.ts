import { v4 as uuidv4 } from 'uuid';

interface Transaction {
  id: string;
  timestamp: Date;
  recipients: string[];
  amounts: number[];
  status: 'pending' | 'confirmed' | 'failed';
  txId?: string;
}

const transactions: Transaction[] = [];

export async function sendTransaction(recipients: string[], amounts: number[]): Promise<any> {
  try {
    // TODO: Implement actual Bitcoin transaction
    // This is a placeholder
    
    const txId = uuidv4();
    const transaction: Transaction = {
      id: txId,
      timestamp: new Date(),
      recipients,
      amounts,
      status: 'pending'
    };
    
    transactions.push(transaction);
    
    return {
      txId,
      status: 'pending',
      recipients,
      totalAmount: amounts.reduce((a, b) => a + b, 0)
    };
  } catch (error: any) {
    throw new Error(`Failed to send transaction: ${error.message}`);
  }
}

export async function getTransactionHistory(limit: number = 50, offset: number = 0): Promise<Transaction[]> {
  return transactions.slice(offset, offset + limit);
}
