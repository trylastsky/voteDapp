import { useEffect, useState } from "react";
import "./PrivateCabinet.css";
import { ethers } from "ethers";


export default function PrivateCabinet({
	signer,
	userAvatar,
	setUserAvatar }) {
	const [voteType, setVoteType] = useState(true); //Задаем состояние созданых опросов/ петиций(true-vote,false-petition)
	// const [userAdr, setUserAdr] = useState();

		// useEffect(() => {
		// 	const adr = async () => {
		// 		let adr = ethers.getAccountPath(signer)
		// 		setUserAdr(adr)
		// 	}
		// 	adr()
		// }, [])

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
					<h1>Ваше имя</h1>
					<h3>ваше описание</h3>
					<h4>ваше время регистрации</h4>
					<h4>userId</h4>
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
