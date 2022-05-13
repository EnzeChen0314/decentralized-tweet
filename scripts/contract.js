const { expect } = require("chai")
const { ethers, upgrades } = require("hardhat")

async function main() {

  const owners = await ethers.getSigners()
  
  const owner = owners[0]

  const ERC20 = await ethers.getContractFactory("MyERC20", owner[0])
  const erc20 = await ERC20.deploy(1, 0, 3)
  await erc20.deployed()
  console.log("ERC20 deployed to:", erc20.address)
  console.log("Initial balance: ", await erc20.balanceOf(owners[0].address))

  const ERC201 = await ethers.getContractFactory("MyERC20", owners[1])
  const erc201 = await ERC201.deploy(0, 60, 3)
  await erc201.deployed()
  console.log("ERC201 deployed to:", erc201.address)
  console.log("Initial balance: ", await erc201.balanceOf(owners[1].address))
  // await erc20.mint(5000)
  // await erc20.transfer(owners[1].address, 2500)
  // console.log("New balance: ", await erc20.balanceOf(owner.address))
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})