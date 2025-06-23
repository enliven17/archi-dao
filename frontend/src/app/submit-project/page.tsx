"use client";
import { useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useWallet } from '@/hooks/useWallet';
import { useArchiDAO } from '@/hooks/useArchiDAO';

const ipfs = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' });

export default function SubmitProject() {
  const [name, setName] = useState('');
  const [architect, setArchitect] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [ipfsUrl, setIpfsUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { account, web3 } = useWallet();
  const { createProposal } = useArchiDAO(web3, account);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIpfsUrl('');
    if (!file) {
      setError('Lütfen bir dosya seçin.');
      return;
    }
    if (!account) {
      setError('Cüzdanınızı bağlayın.');
      return;
    }
    setLoading(true);
    try {
      const added = await ipfs.add(file);
      setIpfsUrl(`https://ipfs.io/ipfs/${added.path}`);
      // Kontrata proje ekle
      await createProposal(added.path, [account]);
      setSuccess('Proje başarıyla oluşturuldu ve kontrata kaydedildi!');
    } catch (err: any) {
      setError('Hata: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full bg-white rounded-lg shadow p-8 mt-8">
      <h1 className="text-2xl font-bold mb-6 text-[#2D3748]">Proje Oluştur</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Proje Adı"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Mimar Adı"
          value={architect}
          onChange={e => setArchitect(e.target.value)}
          className="border rounded px-3 py-2"
          required
        />
        <input
          type="file"
          accept=".pdf,.dwg,.dxf,.cad,.zip"
          onChange={handleFileChange}
          className="border rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-[#4299E1] text-white px-4 py-2 rounded mt-2"
          disabled={loading}
        >
          {loading ? 'Yükleniyor...' : 'IPFS'ye Yükle ve Proje Oluştur'}
        </button>
        {ipfsUrl && (
          <div className="mt-4">
            <span className="text-green-600 font-semibold">IPFS Linki:</span>
            <a href={ipfsUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 underline break-all">{ipfsUrl}</a>
          </div>
        )}
        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
} 