import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useNFT } from '../../hooks/useNFT';
import { useWeb3 } from '../../contexts/Web3Context';

const NFTMarketplace = () => {
  const { account } = useWeb3();
  const { getUserNFTs, getAllNFTs, buyNFT, isLoading, error } = useNFT();

  const [activeTab, setActiveTab] = useState('buyNFTs');
  const [userNFTs, setUserNFTs] = useState([]);
  const [allNFTs, setAllNFTs] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (account) {
      loadNFTs();
    }
  }, [account, activeTab]);

  const loadNFTs = async () => {
    try {
      setStatusMessage('');
      if (activeTab === 'myNFTs') {
        const nfts = await getUserNFTs();
        setUserNFTs(nfts);
      } else if (activeTab === 'buyNFTs') {
        const nfts = await getAllNFTs();
        setAllNFTs(nfts);
      }
    } catch (err) {
      setStatusMessage(`Error loading NFTs: ${err.message}`);
    }
  };

  const handleBuyNFT = async (nft) => {
    if (!nft.buyable) {
      setStatusMessage(`This NFT (${nft.name}) cannot be purchased.`);
      return;
    }
    try {
      setStatusMessage('Processing purchase...');
      const txHash = await buyNFT(nft);
      setStatusMessage(`NFT purchased successfully! Transaction: ${txHash}`);
      loadNFTs(); // Satın alma sonrası NFT'leri yeniden yükle
    } catch (err) {
      setStatusMessage(`Error purchasing NFT: ${err.message}`);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-6">NFT Marketplace</h1>

        {/* Tabs */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setActiveTab('myNFTs')}
            className={`py-2 px-4 rounded-lg shadow-md ${
              activeTab === 'myNFTs'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            My NFTs
          </button>
          <button
            onClick={() => setActiveTab('buyNFTs')}
            className={`py-2 px-4 rounded-lg shadow-md ${
              activeTab === 'buyNFTs'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Buy NFTs
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`mb-4 p-4 rounded-lg text-sm ${
              statusMessage.startsWith('Error')
                ? 'bg-red-900 text-red-400'
                : 'bg-green-900 text-green-400'
            }`}
          >
            {statusMessage}
          </div>
        )}

        {/* Loading / Error / NFT Display */}
        {isLoading ? (
          <div className="text-white">Loading NFTs...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeTab === 'myNFTs' ? userNFTs : allNFTs).map((nft) => (
              <div
                key={nft.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                <img
                  src={nft.image || '/assets/images/placeholder.png'}
                  alt={nft.name}
                  className="w-full h-100 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white">{nft.name}</h3>
                <p className="text-gray-400">{nft.description}</p>
                <p className="text-green-400">Rarity: {nft.rarity}</p>
                <p className="text-blue-400">Value: {nft.tokenValue} EDU</p>
                {nft.warning && (
                  <p className="text-red-500 text-sm mt-2">{nft.warning}</p>
                )}

                {activeTab === 'buyNFTs' && (
                  <button
                    onClick={() => handleBuyNFT(nft)}
                    disabled={!nft.buyable}
                    className={`mt-4 w-full py-2 rounded-lg shadow-lg ${
                      nft.buyable
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {nft.buyable ? 'Buy Now' : '🔒 Locked'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NFTMarketplace;
