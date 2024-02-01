const hre = require("hardhat");

async function main() {
  const ToDoList = await hre.ethers.deployContract("ToDoList");

  await ToDoList.waitForDeployment();

  console.log(
    `Contract deployed to ${ToDoList.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
