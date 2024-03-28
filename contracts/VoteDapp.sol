// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract VoteDapp {
address payable public owner; // адрес владельца
uint public usersCount; // количество пользователей в системе

struct User {
    uint id;// айди пользователя
    string name;//имя пользователя
    string description;// описание пользователя 
    uint timeReg; //Время регистрации на сайте
}

struct Candidate { // структура кандидата
    User user; // структура пользователя , тоесть кандидата голосования
    uint votes; // количество голосов кандидата
}

struct Vote { // структура обычного голосования
    uint idCreator; //тот кто создал голосование
    uint id;//айди голосования
    string name;//имя голосования
    string description; //описание голосования
    uint timeStart; // время начала голосования
    uint timeToJoin; //время за которое пользователь может стать кандидатом
    uint timeEnd; // время завершения голосования
}


struct Petition { // структура петиции
    uint idCreator; // айди создателя петиции
    uint id; //айди петиции
    string name; // имя петиции
    string description; //описание петиции
    uint timeStart; //время старта петиции
    uint timeEnd; //время завершения петиции
    uint votes; //голоса , подписи петиции
}

mapping(address => bool) regStatusMap;//маппинг для уточнения статуса регистрации в системе
mapping(address => uint) userIdMap; // маппинг адрес => id пользователя в системе
mapping(uint => User) userMap; //мапа для вытаскивания юзера по айди
mapping(uint => Candidate) candidatsMap; //массив id голосования => его кандидаты
mapping(uint => bool) candidatsStatusMap; //статус кандидата голосования

Vote[] votesMas; // массив голосований
Petition[] petitionsMas; //массив петиций

modifier checkAdr0() { //проверка на 0аддресс
require(msg.sender != address(0),"Your address not found!");
_;
}

modifier checkBal() { //проверка баланса
require(msg.value > 0, "0 funds sent");
require(msg.sender.balance >= msg.value, "no money no funny");
_;
}

modifier checkReg(bool _bool) { //проверка статуса регистрации
    if (_bool == true) {
        require(regStatusMap[msg.sender] == true, "user not reg!");
    } else if(_bool == false) {
        require(regStatusMap[msg.sender] == false, "user already reg!");
    } 
_;
}

constructor() {
    owner = payable(msg.sender); // deployer владелец
    userIdMap[msg.sender] = usersCount;
    regStatusMap[msg.sender] = true;
    userIdMap[msg.sender] = usersCount;// назначаем айди пользователю
    userMap[userIdMap[msg.sender]] = User( // назначаем по айдишнику структуру
        userIdMap[msg.sender], //айди пользователя
        "Owner", // имя пользователя
        "I'm owner this system UAHAHA", // описание пользователя
        block.timestamp // время регистрации в системе
    );
    usersCount++; // колво пользователей ++
}

function reg( //функция регистрации в системе
    string memory _name, //имя пользователя
    string memory _description //описание пользователя
) public checkAdr0() checkReg(false) { 
    userIdMap[msg.sender] = usersCount;// назначаем айди пользователю
    userMap[userIdMap[msg.sender]] = User( // назначаем по айдишнику структуру
        userIdMap[msg.sender], //айди пользователя
        _name, // имя пользователя
        _description, // описание пользователя
        block.timestamp // время регистрации в системе
    );
    regStatusMap[msg.sender] = true; //статус регистрации true
    usersCount++; //общее колво пользователей увеличивается
}

function autoTh() public view checkReg(true) returns (User memory) {
    return(userMap[userIdMap[msg.sender]]);
}

function addVote( //функция добавить голосование
    string memory _name,
    string memory _description,
    uint _timeToJoin, //колво минут , за которое могут регистрироватся кандидаты
    uint _daysToVote // время голосования, в минутах (test)
    ) 
    public checkReg(true) { 
        votesMas.push(Vote( //пушим в массив структуру голосования
        userIdMap[msg.sender], //достаем от отправителя его айди
        votesMas.length, //айди голосования
        _name, //название голосования 
        _description, // описание голосования
        block.timestamp, // время начала голосования
        block.timestamp + _timeToJoin * 60, // тестовая часть, пользователь может стать кандидатом за x минут
        block.timestamp + _daysToVote * 60 // время голосования в минутах test
        ));
}

function addCandidate(uint idVote) public checkReg(true) {
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