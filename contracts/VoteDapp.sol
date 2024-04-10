// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract VoteDapp {
address payable public owner; // адрес владельца

struct User {
    string name;//имя пользователя
    string description;// описание пользователя 
    uint timeReg; //Время регистрации на сайте
}

struct Candidate { // структура кандидата
    uint id;
    User user; // структура пользователя , тоесть кандидата голосования
    uint votes; // количество голосов кандидата
}

struct Vote { // структура обычного голосования
    uint id;//айди голосования
    address creator; //тот кто создал голосование
    string name;//имя голосования
    string description; //описание голосования
    uint timeStart; // время начала голосования
    uint timeToJoin; //время за которое пользователь может стать кандидатом
    uint timeEnd; // время завершения голосования
}


struct Petition { // структура петиции
    uint id; //айди петиции
    address creator; // айди создателя петиции
    string name; // имя петиции
    string description; //описание петиции
    uint timeStart; //время старта петиции
    uint timeEnd; //время завершения петиции
    uint votes; //голоса , подписи петиции
}


mapping(address => bool) public regStatus;
mapping(address => User) public userMap; // маппинг адрес => id пользователя в системе

mapping (address => bool) public candidateStatusMap;//кандидат может избиратся только в 1 голосовании
mapping(uint => Candidate[]) public candidatsMap; //массив id голосования => его кандидаты

mapping(address => mapping(uint => bool)) statusChangeMap; // маппинг в котором лежит статус голоса в том или ином голосовании

mapping(uint => mapping(address => bool)) oneWriteCheckMap; // маппинг который показывает какие петиции подписал юзер
//мапинги в которых хранятся добавленные пользователем структуры
mapping(address => Petition[]) public userAddedPetitions;
mapping(address => Vote[]) public userAddedVotes;

Vote[] public votesMas; // массив голосований
Petition[] public petitionsMas; //массив петиций

modifier checkAdr0() { //проверка на 0аддресс
require(msg.sender != address(0),"Your address not found!");
_;
}

modifier checkBal() { //проверка баланса
require(msg.value > 0, "0 funds sent");
require(msg.sender.balance >= msg.value, "no money no funny");
_;
}

modifier checkReg() {
    require(regStatus[msg.sender] == true);
    _;
}


constructor() {
    regStatus[msg.sender] = true;
    owner = payable(msg.sender); // deployer владелец
    userMap[msg.sender] = User( // назначаем по айдишнику структуру
        "Trylastsky", // имя пользователя
        "I am the creator of this project, do you like roses?", // описание пользователя
        block.timestamp // время регистрации в системе
    );
}


function checkTimeToJoin(uint idVote) public view returns(bool aha) { //проверка времени для кнопки вступления
    if(block.timestamp <= (votesMas[idVote].timeStart + votesMas[idVote].timeToJoin)) {
        return(true);
    }
    else {
        if(block.timestamp >= (votesMas[idVote].timeStart - votesMas[idVote].timeToJoin)) {
        return(false);
    }
    }
}

// functions for massives length view to frontend

function checkLengthAddedVotes() public view returns(uint) {
    return(userAddedVotes[msg.sender].length);
}

function checkLengthAddedPetitions() public view returns(uint) {
    return(userAddedPetitions[msg.sender].length);
}

function checkLengthCandidats(uint idVote) public view returns(uint) {
    return(candidatsMap[idVote].length);
}

function votesMasLength() public view returns(uint) { 
    return(votesMas.length);
}

function petitionsMasLength() public view returns(uint) {
    return(petitionsMas.length);
}


function writePet(uint index) public checkReg() {
    require(oneWriteCheckMap[index][msg.sender] == false, 'you already write this petition');
    petitionsMas[index].votes++;
    oneWriteCheckMap[index][msg.sender] = true;
}


function reg(string memory _name, string memory _description) public {
    require (regStatus[msg.sender] != true, "you already registred");
    userMap[msg.sender].name = _name;
    userMap[msg.sender].description = _description;
    userMap[msg.sender].timeReg = block.timestamp;
    regStatus[msg.sender] = true;
}

function addVote( //функция добавить голосование
    string memory _name,
    string memory _description,
    uint _timeToJoin, //колво минут , за которое могут регистрироватся кандидаты
    uint _daysToVote // время голосования, в минутах (test)
    ) 
    public checkReg()  { 
        Vote memory newVote = Vote(
         votesMas.length, //айди голосования
        msg.sender, //достаем от отправителя его address
        _name, //название голосования 
        _description, // описание голосования
        block.timestamp, // время начала голосования
        block.timestamp + _timeToJoin * 60, // тестовая часть, пользователь может стать кандидатом за x минут
        block.timestamp + _daysToVote * 60 // время голосования в минутах test
        );
    votesMas.push(newVote);
    userAddedVotes[msg.sender].push(newVote);
}

function delVote(uint index) public checkReg() {
    uint idVote = userAddedVotes[msg.sender][index].id;    // Получаем id голоса для удаления
    delete userAddedVotes[msg.sender][index];    // Удаляем голос из голосов пользователя
    userAddedVotes[msg.sender][index] = userAddedVotes[msg.sender][userAddedVotes[msg.sender].length - 1];     // Переносим последний голос вместо удаленного голоса
    userAddedVotes[msg.sender][index].id = idVote;     // Обновляем id последнего голоса
    userAddedVotes[msg.sender].pop();    // Удаляем последний голос
    delete votesMas[idVote];     // Удаляем голос из массива голосов
    votesMas[idVote] = votesMas[votesMas.length - 1];    // Обновляем id последнего голоса
    votesMas.pop();     // Удаляем последний голос
    candidateStatusMap[msg.sender] = false;     
}

function addPet( //функция добавить голосование
    string memory _name,
    string memory _description,
    uint _daysToVote // время голосования, в минутах (test)
    ) 
    public checkReg() { //добавляем петицию
        Petition memory pet = Petition(
            //пушим в массив структурупетиции
            petitionsMas.length, //айди петиции
            msg.sender, //достаем от отправителя его адресс
            _name, //название петиции
            _description, // описание петиции
            block.timestamp, // время начала петиции
            block.timestamp + _daysToVote * 60, // время голосования в минутах test
            0 //количество голосов 0 иначе побьют
        );
        petitionsMas.push(pet);
        userAddedPetitions[msg.sender].push(pet);
    
}

function delPet(uint index) public checkReg() {
    uint idPet = userAddedPetitions[msg.sender][index].id;
    delete userAddedPetitions[msg.sender][index];
    userAddedPetitions[msg.sender][index] = userAddedPetitions[msg.sender][userAddedPetitions[msg.sender].length - 1];
    userAddedPetitions[msg.sender][index].id = idPet;
    userAddedPetitions[msg.sender].pop();
    delete petitionsMas[idPet];
    petitionsMas[idPet] = petitionsMas[petitionsMas.length - 1];
    petitionsMas.pop();
}

function addCandidate(uint idVote) public checkReg()  { // добавление кандидата
    require(candidateStatusMap[msg.sender] == false, 'you already candidate');// проверка участвует ли кандидат в ругих голсованиях
    require(block.timestamp <= votesMas[idVote].timeStart + votesMas[idVote].timeToJoin, 'end push candidats, time over');// проверка уложился ли кандидат в временное ограничение для поступления
    candidatsMap[idVote].push(Candidate(candidatsMap[idVote].length,userMap[msg.sender], 0));// добавляем в мапу голосования кандидата с 0 голосов
    candidateStatusMap[msg.sender] = true; //ставим статус что отправитель пока больше не может голосовать

}

function changeCandidate(uint idVote,uint idCandidate) public checkReg() {//проголосовать за кандидата
    require(statusChangeMap[msg.sender][idVote] != true, 'you already change candidate');//проверка голосовал ли юзер
    require(block.timestamp <= votesMas[idVote].timeStart + votesMas[idVote].timeEnd, 'time to vote ended');// проверка на действительность голосования
    candidatsMap[idVote][idCandidate].votes++; //добавляем голосов кандидату
    statusChangeMap[msg.sender][idVote] = true; // сообщаем что отправитель уже проголосовал

}

function Donate() public payable checkAdr0() checkBal() { //функция для доната деплроеру
    require(msg.sender != owner, "you trust owner XD");
    owner.transfer(msg.value); // перевод владельцу контракта donate
}

function viewPoll() public view returns(Vote[] memory) { //test 
    return(votesMas);
}
}