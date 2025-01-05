import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useWeb3 } from '../contexts/Web3Context';
import useNFT from '../hooks/useNFT';

const TestMint = () => {
  const { account } = useWeb3();
  const { mintNFT, isLoading, error } = useNFT();
  const [status, setStatus] = useState('');

  const handleTestMint = async () => {
    try {
      setStatus('Minting başlatıldı...');
      
      const metadata = {
        name: "Test Course NFT",
        description: "Bu bir test NFT'sidir",
        nftType: "course",
        rarity: "rare",
        unlockLevel: 1,
        unlockedContent: ["Test Course 1", "Test Course 2"],
        tokenValue: 100
      };

      const txHash = await mintNFT({
        name: metadata.name,
        description: metadata.description,
        nftType: metadata.nftType,
        rarity: metadata.rarity,
        unlockLevel: metadata.unlockLevel,
        unlockedContent: metadata.unlockedContent,
        tokenValue: metadata.tokenValue
      });

      setStatus(`NFT başarıyla mint edildi! TX Hash: ${txHash}`);
    } catch (err) {
      setStatus(`Hata: ${err.message}`);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Test NFT Mint</h1>

        <div className="bg-gray-800 rounded-xl p-6 max-w-md">
          <div className="mb-4">
            <p className="text-gray-400">Bağlı Cüzdan:</p>
            <p className="text-purple-400">
              {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Bağlı değil'}
            </p>
          </div>

          <button
            onClick={handleTestMint}
            disabled={isLoading || !account}
            className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'İşlem devam ediyor...' : 'Test NFT Mint Et'}
          </button>

          {status && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg">
              <p className="text-white break-words">{status}</p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TestMint;