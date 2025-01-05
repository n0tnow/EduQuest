require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    educhain: {
      url: "https://rpc.open-campus-codex.gelato.digital",
      chainId: 656476,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};