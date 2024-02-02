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
