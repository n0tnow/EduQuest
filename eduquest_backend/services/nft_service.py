from web3 import Web3
from django.conf import settings
import json
import logging

logger = logging.getLogger(__name__)

class NFTService:
    def __init__(self):
        self.web3 = Web3(Web3.HTTPProvider(settings.WEB3_PROVIDER))
        self.contract_address = settings.NFT_CONTRACT_ADDRESS
        with open(settings.NFT_CONTRACT_ABI) as f:
            self.contract_abi = json.load(f)
        self.contract = self.web3.eth.contract(
            address=self.contract_address,
            abi=self.contract_abi
        )

    def mint_course_completion_nft(self, user_address, course_name, level):
        """Mint an NFT for course completion."""
        try:
            metadata = self._generate_metadata(course_name, level)
            tx_hash = self.contract.functions.mintNFT(
                user_address,
                metadata["name"],
                metadata["description"],
                metadata["nft_type"],
                metadata["rarity"],
                metadata["unlock_level"],
                metadata["unlocked_content"],
                metadata["token_value"],
            ).transact({"from": settings.ADMIN_ADDRESS})
            
            receipt = self.web3.eth.wait_for_transaction_receipt(tx_hash)
            logger.info(f"Course Completion NFT minted successfully: {receipt}")
            return receipt
        except Exception as e:
            logger.error(f"Error minting course completion NFT: {str(e)}")
            raise

    def mint_quiz_achievement_nft(self, user_address, score, quiz_type):
        """Mint an NFT for quiz achievement."""
        try:
            rarity = self._calculate_rarity(score)
            unlocked_content = self._generate_unlocked_content(score)

            tx_hash = self.contract.functions.mintNFT(
                user_address,
                f"{quiz_type} Quiz Master NFT",
                f"Quiz score: {score}",
                "quiz",
                rarity,
                score,
                unlocked_content,
                score,
            ).transact({"from": settings.ADMIN_ADDRESS})

            receipt = self.web3.eth.wait_for_transaction_receipt(tx_hash)
            logger.info(f"Quiz Achievement NFT minted successfully: {receipt}")
            return receipt
        except Exception as e:
            logger.error(f"Error minting quiz achievement NFT: {str(e)}")
            raise

    def _calculate_rarity(self, level):
        """Calculate the rarity of the NFT."""
        if level >= 90:
            return "legendary"
        elif level >= 75:
            return "epic"
        elif level >= 60:
            return "rare"
        return "common"

    def _generate_metadata(self, course_name, level):
        """Generate metadata for the NFT."""
        return {
            "name": f"{course_name} Completion NFT",
            "description": f"Congratulations on completing {course_name}!",
            "nft_type": "course",
            "rarity": self._calculate_rarity(level),
            "unlock_level": level,
            "unlocked_content": [f"Advanced {course_name}", "Bonus Materials"],
            "token_value": level * 10,
        }

    def _generate_unlocked_content(self, score):
        """Generate unlocked content based on the score."""
        if score >= 90:
            return ["Premium Quizzes", "2x Points Bonus"]
        elif score >= 80:
            return ["Advanced Quizzes"]
        return []
