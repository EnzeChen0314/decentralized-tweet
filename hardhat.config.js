require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require('@openzeppelin/hardhat-upgrades')
require("dotenv").config()
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    Huygens_dev: {
      url: process.env.HUYGENS_DEV_URL,
      accounts: [
        process.env.HUYGENS_DEV_PRIVATE_KEY1, 
        process.env.HUYGENS_DEV_PRIVATE_KEY2, 
        process.env.HUYGENS_DEV_PRIVATE_KEY3, 
        process.env.HUYGENS_DEV_PRIVATE_KEY4
      ]
    },
    Huygens: {
      url: process.env.HUYGENS_URL,
      accounts: [
        process.env.HUYGENS_PRIVATE_KEY
      ]
    },
  }
};
