import { useCallback } from 'react';
import Web3 from 'web3';
import { ARCHI_DAO_ADDRESS, ARCHI_DAO_ABI } from '@/api/contracts';

export function useArchiDAO(web3: Web3 | null, account: string | null) {
  const contract = web3 && new web3.eth.Contract(ARCHI_DAO_ABI as any, ARCHI_DAO_ADDRESS);

  // Proje oluşturma (IPFS hash ve contributors)
  const createProposal = useCallback(
    async (ipfsHash: string, contributors: string[]) => {
      if (!contract || !account) throw new Error('Cüzdan bağlı değil.');
      return contract.methods.createProposal(ipfsHash, contributors).send({ from: account });
    },
    [contract, account]
  );

  // Oylama
  const vote = useCallback(
    async (proposalId: number, support: boolean) => {
      if (!contract || !account) throw new Error('Cüzdan bağlı değil.');
      return contract.methods.vote(proposalId, support).send({ from: account });
    },
    [contract, account]
  );

  return { createProposal, vote };
} 