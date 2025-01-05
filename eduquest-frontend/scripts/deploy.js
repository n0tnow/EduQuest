async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const EduQuestNFT = await ethers.getContractFactory("EduQuestNFT");
    const eduQuestNFT = await EduQuestNFT.deploy();
    await eduQuestNFT.deployed();
  
    console.log("EduQuestNFT deployed to:", eduQuestNFT.address);
  
    // Contract'ı verify etmek için gerekli bilgileri yazdır
    console.log("Contract verification command:");
    console.log("npx hardhat verify --network educhain", eduQuestNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });