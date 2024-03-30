//используется расширение .cjs так как используем модульную систему vue
const { ethers } = require("hardhat");
const { votes,petitions } = require('./constructor.json')
const fs = require('fs');


async function main() {
  const [deployer] = await ethers.getSigners(); //получение адреса пользователя, развертывающего контракт (deployer)

  console.log("Deploying contracts with the account:", deployer.address); // показать адрес deployer в консоль

  const VoteDapp = await ethers.getContractFactory("VoteDapp"); //получение контракта из среды
  const votedapp = await VoteDapp.deploy(); // деплой контракта на выбранную сеть /npx hardhat run scripts/deploy.cjs --network x
  console.log("Contract deployed to address:", votedapp.target); // вывод адреса контракта, в новых версиях .target
  fs.writeFileSync('contractAddress.json', JSON.stringify(votedapp.target)); //запись адреса контракта в файл 

  //add start vote
  for (let i = 0; i < votes.length; i++) {
    const transaction = await votedapp.connect(deployer).addVote(
      votes[i].name,
      votes[i].description,
      votes[i].timeToJoin,
      votes[i].timeEnd,
    )
    await transaction.wait();

    console.log(`Added votePoll < ${votes[i].name} >`)
  }

  //add petitions
  for (let i = 0; i < petitions.length; i++) {
    const transaction = await votedapp.connect(deployer).addPetition(
      petitions[i].name,
      petitions[i].description,
      petitions[i].timeEnd,
    )
    await transaction.wait();
    
    console.log(`Added petition < ${petitions[i].name} >`);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
