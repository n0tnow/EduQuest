import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, NFT_CONTRACT_ABI } from '../config/contracts';
import { useWeb3 } from '../contexts/Web3Context';

export const useNFT = () => {
  const { account } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableNFTs, setAvailableNFTs] = useState([
    {
      id: '1',
      name: 'Exclusive Course NFT',
      description: 'Unlocks advanced courses and materials',
      nftType: 'course',
      rarity: 'rare',
      unlockLevel: 50,
      unlockedContent: ['Advanced Topics', 'Bonus Lessons'],
      tokenValue: 100,
      image: '/assets/images/1.png',
      buyable: false,
      warning: '🔒 This NFT can only be earned by completing the course.'
    },
    {
      id: '2',
      name: 'Achievement NFT',
      description: 'Earned for completing Python Basics',
      nftType: 'achievement',
      rarity: 'epic',
      unlockLevel: 80,
      unlockedContent: ['Expert Topics', 'Certificate'],
      tokenValue: 200,
      image: '/assets/images/2.png',
      buyable: false,
      warning: '🔒 This NFT can only be earned by completing the quiz.'
    },
    {
      id: '3',
      name: 'Quiz Master NFT',
      description: 'Awarded for scoring 100% in a quiz',
      nftType: 'quiz',
      rarity: 'legendary',
      unlockLevel: 100,
      unlockedContent: ['Exclusive Quizzes', 'Special Rewards'],
      tokenValue: 300,
      image: '/assets/images/3.png',
      buyable: false,
      warning: '🔒 This NFT can only be earned by scoring 100% on the quiz.'
    },
    {
      id: '4',
      name: 'Rare Collectible NFT',
      description: 'A rare collectible NFT to showcase.',
      nftType: 'collectible',
      rarity: 'rare',
      unlockLevel: 10,
      unlockedContent: [],
      tokenValue: 150,
      image: '/assets/images/4.png',
      buyable: true,
      warning: ''
    },
    {
      id: '5',
      name: 'Epic Artwork NFT',
      description: 'An epic NFT with stunning artwork.',
      nftType: 'art',
      rarity: 'epic',
      unlockLevel: 0,
      unlockedContent: [],
      tokenValue: 250,
      image: '/assets/images/5.png',
      buyable: true,
      warning: ''
    },
    {
      id: '6',
      name: 'Legendary Badge NFT',
      description: 'A legendary NFT to commemorate achievements.',
      nftType: 'badge',
      rarity: 'legendary',
      unlockLevel: 0,
      unlockedContent: [],
      tokenValue: 500,
      image: '/assets/images/6.png',
      buyable: true,
      warning: ''
    }
  ]);

  const getNFTContract = useCallback(async (withSigner = false) => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask is not installed');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    if (withSigner) {
      const signer = provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
    }

    return new ethers.Contract(CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
  }, []);

  const mintNFT = async (metadata) => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = await getNFTContract(true);
      const tx = await contract.mintNFT(
        account,
        metadata.name,
        metadata.description,
        metadata.nftType,
        metadata.rarity,
        metadata.unlockLevel,
        metadata.unlockedContent,
        metadata.tokenValue
      );

      const receipt = await tx.wait();
      return receipt.transactionHash;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserNFTs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = await getNFTContract();
      const nftIds = await contract.getUserNFTs(account);

      const nfts = await Promise.all(
        nftIds.map(async (id) => {
          const metadata = await contract.getNFTMetadata(id);
          return {
            id: id.toString(),
            name: metadata[0],
            description: metadata[1],
            nftType: metadata[2],
            rarity: metadata[3],
            unlockLevel: metadata[4].toString(),
            unlockedContent: metadata[5],
            tokenValue: metadata[6].toString(),
            image: `/images/nft-${metadata[2]}${id}.png`,
            buyable: metadata[2] !== 'course' && metadata[2] !== 'quiz',
            warning: metadata[2] === 'course'
              ? '🔒 This NFT can only be earned by completing the course.'
              : metadata[2] === 'quiz'
              ? '🔒 This NFT can only be earned by scoring 100% on the quiz.'
              : ''
          };
        })
      );

      return nfts;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getAllNFTs = async () => {
    try {
      return availableNFTs;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const buyNFT = async (nft) => {
    if (!nft.buyable) {
      setError(`Bu NFT (${nft.name}) satın alınamaz.`);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const txHash = await mintNFT(nft);
      setAvailableNFTs((prev) => prev.filter((item) => item.id !== nft.id));
      return txHash;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mintNFT,
    getUserNFTs,
    getAllNFTs,
    buyNFT,
    isLoading,
    error,
  };
};

export default useNFT;
