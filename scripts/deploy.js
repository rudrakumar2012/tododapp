
const hre = require("hardhat");

async function main() {
  const TaskContract = await hre.ethers.deployContract("TaskContract");

  await TaskContract.waitForDeployment();

  console.log(
    `Contract deployed to ${TaskContract.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0x5FbDB2315678afecb367f032d93F642f64180aa3