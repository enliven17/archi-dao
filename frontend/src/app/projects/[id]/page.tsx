"use client";
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import { useArchiDAO } from '@/hooks/useArchiDAO';

const dummyProject = {
  id: 1,
  name: 'Modern Villa',
  architect: 'Zeynep Yılmaz',
  votesFor: 12,
  votesAgainst: 3,
  ipfs: 'https://ipfs.io/ipfs/QmExample',
};

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4299E1" />
    </mesh>
  );
}

export default function ProjectDetail() {
  const router = useRouter();
  // Gerçek veri için router.query.id ile fetch yapılacak
  const project = dummyProject;

  const { account, web3 } = useWallet();
  const { vote } = useArchiDAO(web3, account);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleVote = async (support: boolean) => {
    setError('');
    setSuccess('');
    if (!account) {
      setError('Cüzdanınızı bağlayın.');
      return;
    }
    setLoading(true);
    try {
      await vote(project.id, support);
      setSuccess('Oyunuz başarıyla gönderildi!');
    } catch (err: any) {
      setError('Hata: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row gap-8">
      {/* 3D Model Preview */}
      <div className="w-full md:w-1/2 h-80 bg-gray-100 rounded flex items-center justify-center">
        <Canvas camera={{ position: [2, 2, 2] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Box />
          <OrbitControls />
        </Canvas>
      </div>
      {/* Project Info */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#2D3748]">{project.name}</h2>
        <div className="text-gray-600">Mimar: {project.architect}</div>
        <div className="flex gap-4">
          <span className="text-[#4299E1] font-bold">{project.votesFor} For</span>
          <span className="text-red-500 font-bold">{project.votesAgainst} Against</span>
        </div>
        <a href={project.ipfs} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">IPFS'de Görüntüle</a>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-[#4299E1] text-white px-4 py-2 rounded"
            onClick={() => handleVote(true)}
            disabled={loading}
          >
            {loading ? 'Gönderiliyor...' : 'Vote For'}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleVote(false)}
            disabled={loading}
          >
            {loading ? 'Gönderiliyor...' : 'Vote Against'}
          </button>
        </div>
        {success && <div className="text-green-600 mt-2">{success}</div>}
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
} 