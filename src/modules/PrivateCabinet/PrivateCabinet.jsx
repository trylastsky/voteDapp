import { useEffect, useState } from "react";
import "./PrivateCabinet.css";
import { ethers } from "ethers";


export default function PrivateCabinet({
	votedapp,
	signer,
	userAvatar,
	setUserAvatar }) {
	const [voteType, setVoteType] = useState(true); //Задаем состояние созданых опросов/ петиций(true-vote,false-petition)
	const [userName, setUserName] = useState('Your name');
	const [userDescription, setUserDescription] = useState('Your description')
	const [userTimeOfReg, setUserTimeOfReg] = useState(null);

		useEffect(() => {
			const setStates = async () => {
				const userMap = await votedapp.connect(signer).userMap(signer)
				setUserName(userMap.name);
				setUserDescription(userMap.description);
				const date = Number(userMap.timeReg);
				console.log(date)
				const newDate = new Date().getTime();
				console.log(newDate)
				const dateReg = newDate - date + date
				setUserTimeOfReg(new Date(dateReg).toLocaleDateString());
			}
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
					<h1>{userName}</h1>
					<h3>{userDescription}</h3>
					<h4>{userTimeOfReg}</h4>
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
									К Петициям
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
									К Голосованиям
								</button>
								<button className="ChangeButtonPetitions">Добавить Петицию</button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
