import { useState } from "react";
import "./PrivateCabinet.css";

export default function PrivateCabinet({ userAvatar, setUserAvatar }) {
	const [voteType, setVoteType] = useState(true); //Задаем состояние созданых опросов/ петиций(true-vote,false-petition)

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
					<h1>ваш никнейм</h1>
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
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
