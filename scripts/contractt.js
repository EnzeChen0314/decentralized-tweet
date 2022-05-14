const { expect } = require("chai")
const { ethers, upgrades } = require("hardhat")
const { string } = require("hardhat/internal/core/params/argumentTypes")

async function main() {

  const owners = await ethers.getSigners()
  
  const proposer = owners[0]
  const address0 = proposer.address
  const n = 3
  const final = 2
  spend = 60
  
  const ERCT0 = await ethers.getContractFactory("ERCTT", owners[0])
  const erc0 = await ERCT0.deploy(0, spend, 1, address0) 
  await erc0.deployed()
  console.log("Owner 0 Initial balance: ", await erc0.balanceOf(owners[0].address))

  const ERCT1 = await ethers.getContractFactory("ERCTT", owners[1])
  const erc1 = await ERCT1.deploy(0, spend, n, address0) 
  await erc1.deployed()
  console.log("Owner 1 Initial balance: ", await erc1.balanceOf(owners[1].address))

  const ERCT2 = await ethers.getContractFactory("ERCTT", owners[2])
  const erc2 = await ERCT2.deploy(1, spend, n, address0) 
  await erc2.deployed()
  console.log("Owner 2 Initial balance: ", await erc2.balanceOf(owners[2].address))

  const ERCT3 = await ethers.getContractFactory("ERCTT", owners[3])
  const erc3 = await ERCT3.deploy(1, spend, n, address0)
  await erc3.deployed()
  console.log("Owner 3 Initial balance: ", await erc3.balanceOf(owners[3].address))

  await erc0.publish1(owners[1].address)
  await erc0.publish1(owners[2].address)
  await erc0.publish1(owners[3].address)

  console.log("Owner 0 Stage 1 balance: ", await erc0.balanceOf(owners[0].address))
  console.log("Owner 1 Stage 1 balance: ", await erc1.balanceOf(owners[1].address))
  console.log("Owner 2 Stage 1 balance: ", await erc2.balanceOf(owners[2].address))
  console.log("Owner 3 Stage 1 balance: ", await erc3.balanceOf(owners[3].address))

  
 await erc1.publish2(final)

 await erc2.publish2(final)

 await erc3.publish2(final)

 await erc1.publish3(owners[0].address)

 await erc2.publish3(owners[0].address)

 await erc3.publish3(owners[0].address)



  console.log("Owner 0 New balance: ", await erc0.balanceOf(owners[0].address))
  console.log("Owner 1 New balance: ", await erc1.balanceOf(owners[1].address))
  console.log("Owner 2 New balance: ", await erc2.balanceOf(owners[2].address))
  console.log("Owner 3 New balance: ", await erc3.balanceOf(owners[3].address))
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})