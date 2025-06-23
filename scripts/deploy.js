const { ethers, upgrades } = require("hardhat");

async function main() {
  // ArchiToken deploy
  const ArchiToken = await ethers.getContractFactory("ArchiToken");
  const archiToken = await upgrades.deployProxy(ArchiToken, [], { initializer: 'initialize' });
  await archiToken.deployed();
  console.log("ArchiToken deployed to:", archiToken.address);

  // ArchiDAO deploy
  const ArchiDAO = await ethers.getContractFactory("ArchiDAO");
  const archiDAO = await upgrades.deployProxy(ArchiDAO, [archiToken.address], { initializer: 'initialize' });
  await archiDAO.deployed();
  console.log("ArchiDAO deployed to:", archiDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 