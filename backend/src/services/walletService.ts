import * as bitcoin from 'bitcoinjs-lib';

const NETWORK = process.env.BITCOIN_NETWORK === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;

export function generateWallet() {
  try {
    const keyPair = bitcoin.ECPair.makeRandom({ network: NETWORK });
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: NETWORK });
    
    return {
      address,
      publicKey: keyPair.publicKey.toString('hex'),
      privateKey: keyPair.toWIF() // ⚠️ NEVER expose in production
    };
  } catch (error: any) {
    throw new Error(`Failed to generate wallet: ${error.message}`);
  }
}

export async function getBalance(address: string): Promise<number> {
  try {
    // TODO: Implement via Electrum RPC or blockchain API
    // For now, return mock data
    return 0.5; // BTC
  } catch (error: any) {
    throw new Error(`Failed to get balance: ${error.message}`);
  }
}

export function validateAddress(address: string): boolean {
  try {
    bitcoin.address.toOutputScript(address, NETWORK);
    return true;
  } catch (error) {
    return false;
  }
}
