//используется расширение .cjs так как используем модульную систему vue
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners(); //получение адреса пользователя, развертывающего контракт (deployer)

  console.log("Deploying contracts with the account:", deployer.address); // показать адрес deployer в консоль

  const VoteDapp = await ethers.getContractFactory("VoteDapp"); //получение контракта из среды
  const votedapp = await VoteDapp.deploy(); // деплой контракта на выбранную сеть /npx hardhat run scripts/deploy.cjs --network x

  console.log("Contract deployed to address:", votedapp.target); // вывод адреса контракта, в новых версиях .target 
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
