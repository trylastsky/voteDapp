import { useEffect, useState, useCallback } from "react";
import "./PrivateCabinet.css";


export default function PrivateCabinet({
	votedapp,
	signer,
	userAvatar,
	setUserAvatar }) {
	const [voteType, setVoteType] = useState(true); //Задаем состояние созданых опросов/ петиций(true-vote,false-petition)
	const [userName, setUserName] = useState('Your name');
	const [userDescription, setUserDescription] = useState('Your description')
	const [userTimeOfReg, setUserTimeOfReg] = useState(null);
	//массив петиций и голосований пользователя
	const [userAddedVotes, setAddedVotes] = useState([]);
	const [userAddedPetitions, setAddedPetitions] = useState([]);

	const setStates = useCallback(async () => {
		const newVotes = [];
		const newPetitions = [];
		const userMap = await votedapp.connect(signer).userMap(signer)
		setUserName(userMap.name);
		setUserDescription(userMap.description);
		const date = Number(userMap.timeReg);
		const newDate = new Date().getTime();
		const dateReg = newDate - date + date
		setUserTimeOfReg(new Date(dateReg).toLocaleDateString());

		const VotesLength = await votedapp.connect(signer).checkLengthAddedVotes();
		for(let i = 0; i < Number(VotesLength); i++ ) {
			const vote = await votedapp.connect(signer).userAddedVotes(signer,i);
			newVotes.push(vote);
		}
		setAddedVotes(newVotes);


		const PetitionsLength = await votedapp.connect(signer).checkLengthAddedPetitions();
		for(let i = 0; i < Number(PetitionsLength); i++) {
			const petition = await votedapp.connect(signer).userAddedPetitions(signer, i);
			newPetitions.push(petition);

		}
		setAddedPetitions(newPetitions);
	})



		useEffect(() => {
			setStates()
		}, [])

		window.ethereum.on('accountsChanged', () => {
			window.location.reload();
		})
	return (
		<>
			<div className="PrivateCabinet">
				<div className="infoContainerPrivateCab">
                    {/* по возможности добавить функционал смены аватара */}
					<button className="PrivateUserAvatarBut"> 
						<img
							className="PrivateUserAvatar"
							src={userAvatar}
							alt="ваш аватар"
						/>
					</button>
					<div id="info">
					<h1 id='info'>{userName}</h1>
					<h3 id='info'>{userDescription}</h3>
					<h4 id='info'>{userTimeOfReg}</h4>
					</div>
				</div>
				<div className="UserVoteList">
					<h1>
						Ваши
						{voteType ? <>{" Голосования"}</> : <>{" Петиции"}</>}
					</h1>
					<div className="ChangeVoteTypeButtons">
						{voteType ? (
							<>
								<button
									className="ChangeButtonPetitions"
									onClick={() => {
										setVoteType(false);
									}}
								>
									Петиции
								</button>
								<button className="ChangeButtonVotes" onClick={() => {
									
								}}>Добавить Голосование</button>
							</>
						) : (
							<>
								<button
									className="ChangeButtonVotes"
									onClick={() => {
										setVoteType(true);
									}}
								>
									Голосования
								</button>
								<button className="ChangeButtonPetitions">Добавить Петицию</button>
							</>
						)}
					</div>
					{voteType ? (<>
						<div className="myVotes">
							{userAddedVotes.length == 0 && (<><p>Пока вы не добавили не одного голосования</p></>)}
					{
						userAddedVotes.map((vote,index) => (<>
						
							<div className="myVote" key={'myVote' + vote.id}>
							<h3 id="info2">{vote.name}</h3>
							<h1>{Number(index)}</h1>
							<button className="DeleteBut" onClick={async () => {
								await votedapp.connect(signer).delVote(index);
							}}>Удалить</button>
							</div>
						
							
						</>))
					}
					</div>
					
					</>) : (<>
					{/* Петиции */}
						<div className="myVotes">
							{userAddedPetitions.length == 0 && (<><h3>Пока вы не добавили не одной петиции</h3></>)}
					{
						userAddedPetitions.map((pet) => (<>
						
							<div className="myVote" key={'myPet' + pet.id}>
							<h3 id="info2">{pet.name}</h3>
							<p>{pet.id}</p>
							<button className="DeleteBut" onClick={async () => {
								await votedapp.connect(signer).delVote(vote.id);
							}}>Удалить</button>
							</div>
						
							
						</>))
					}
					</div>
					
					</>)}
				</div>
			</div>
		</>
	);
}
