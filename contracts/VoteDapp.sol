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
mapping(uint => Candidate) candidatsMap; //массив id голосования => его кандидаты
mapping(uint => bool) candidatsStatusMap; //статус кандидата голосования


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


constructor() {
    owner = payable(msg.sender); // deployer владелец
    userMap[msg.sender] = User( // назначаем по айдишнику структуру
        "Owner", // имя пользователя
        "I'm owner this system UAHAHA", // описание пользователя
        block.timestamp // время регистрации в системе
    );
}


function writePetTest() public {
}


function reg(string memory _name, string memory _description) public {
    require (regStatus[msg.sender] != true, "you already registred");
    userMap[msg.sender].name = _name;
    userMap[msg.sender].description = _description;
    userMap[msg.sender].timeReg = block.timestamp;
}

function addVote( //функция добавить голосование
    string memory _name,
    string memory _description,
    uint _timeToJoin, //колво минут , за которое могут регистрироватся кандидаты
    uint _daysToVote // время голосования, в минутах (test)
    ) 
    public  { 
        votesMas.push(Vote( //пушим в массив структуру голосования
        votesMas.length, //айди голосования
        msg.sender, //достаем от отправителя его address
        _name, //название голосования 
        _description, // описание голосования
        block.timestamp, // время начала голосования
        block.timestamp + _timeToJoin * 60, // тестовая часть, пользователь может стать кандидатом за x минут
        block.timestamp + _daysToVote * 60 // время голосования в минутах test
        ));
}

function addPetition( //функция добавить голосование
    string memory _name,
    string memory _description,
    uint _daysToVote // время голосования, в минутах (test)
    ) 
    public  { //добавляем петицию
        petitionsMas.push(Petition( //пушим в массив структурупетиции
        petitionsMas.length, //айди петиции
        msg.sender, //достаем от отправителя его адресс
        _name, //название петиции
        _description, // описание петиции
        block.timestamp, // время начала петиции
        block.timestamp + _daysToVote * 60, // время голосования в минутах test
        0 //количество голосов 0 иначе побьют
        ));
}


function addCandidate(uint idVote) public  {
    // require(votesMas[idVote] <= votesMas.length,"this poll not found");

}

function Donate() public payable checkAdr0() checkBal() { //функция для доната деплроеру
    require(msg.sender != owner, "you trust owner XD");
    owner.transfer(msg.value); // перевод владельцу контракта donate
}

function viewPoll() public view returns(Vote[] memory) { //test 
    return(votesMas);
}
}