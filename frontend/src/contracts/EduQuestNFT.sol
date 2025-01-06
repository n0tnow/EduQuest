// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EduQuestNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct NFTMetadata {
        string name;
        string description;
        string nftType;    // course, achievement, quiz
        string rarity;     // common, rare, epic, legendary
        uint256 unlockLevel;
        string[] unlockedContent;
        uint256 tokenValue;
    }

    mapping(uint256 => NFTMetadata) public nftMetadata;
    mapping(address => uint256[]) public userNFTs;
    
    event NFTMinted(address indexed to, uint256 indexed tokenId, string nftType);

    constructor() ERC721("EduQuest NFT", "EDU") {}

    function mintNFT(
        address recipient,
        string memory name,
        string memory description,
        string memory nftType,
        string memory rarity,
        uint256 unlockLevel,
        string[] memory unlockedContent,
        uint256 tokenValue
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(recipient, newTokenId);
        
        nftMetadata[newTokenId] = NFTMetadata(
            name,
            description,
            nftType,
            rarity,
            unlockLevel,
            unlockedContent,
            tokenValue
        );

        userNFTs[recipient].push(newTokenId);
        emit NFTMinted(recipient, newTokenId, nftType);

        return newTokenId;
    }

    function getUserNFTs(address user) public view returns (uint256[] memory) {
        return userNFTs[user];
    }

    function getNFTMetadata(uint256 tokenId) public view returns (
        string memory name,
        string memory description,
        string memory nftType,
        string memory rarity,
        uint256 unlockLevel,
        string[] memory unlockedContent,
        uint256 tokenValue
    ) {
        NFTMetadata memory metadata = nftMetadata[tokenId];
        return (
            metadata.name,
            metadata.description,
            metadata.nftType,
            metadata.rarity,
            metadata.unlockLevel,
            metadata.unlockedContent,
            metadata.tokenValue
        );
    }
}