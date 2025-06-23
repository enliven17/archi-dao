"use client";

import { useState, useCallback } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const provider: any = await detectEthereumProvider();
      if (provider) {
        await provider.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        setError('MetaMask not found.');
      }
    } catch (err: any) {
      setError(err.message || 'Connection failed.');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  return { account, web3, connect, isConnecting, error };
} 